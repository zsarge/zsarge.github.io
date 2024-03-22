Title: Using Rust on an ESP32 to connect to WIFI
Preview: I'm not sure what I'm doing, but that hasn't stopped me before.
Date: 2099-11-15
Tags: rust, iot

I've been using [Rust](https://www.rust-lang.org/) for a while, and I've enjoyed writing toy applications and speedy algorithms. I've been using [Arduino](https://www.arduino.cc/)/C++ for even longer, but mostly for Embedded/<abbr title="Internet of Things">IoT</abbr> development.

This post documents my experience combining both worlds, and using Rust for *basic* embedded development.

## The End Goal

My end vision is to have a local development server that hosts a webpage with a button. When you click the button, it will send an event to all connected ESP32s, and make their internal LED blink.

This represents an abstract base for future event-driven ESP32 projects.

## Installation Instructions

<aside>
The following is mirrored from [GitHub](https://github.com/Norse-IoT/rust-on-esp32/blob/c4d1c381f78177efdb20f457f697c6ccc37f713b/README.md).
</aside>

The following instructions were taken from <https://github.com/esp-rs/rust-build#rust-build>.

Thank you to the [esp-rs](https://github.com/esp-rs) community for making this process streamlined.

### Using Rust for ESP32

**Step 0:** install Rust & Cargo from RustUp

- Go to <https://rustup.rs/>

**Step 1:**  [Install espup](<https://github.com/esp-rs/rust-build#espup-installation>)

```bash
cargo install espup
espup install # To install Espressif Rust ecosystem
# [Unix]: Source the following file in every terminal before building a project
. $HOME/export-esp.sh
```
**Step 2:** [RISC-V Installation](<https://github.com/esp-rs/rust-build#risc-v-installation>)

```bash
rustup target add riscv32imc-unknown-none-elf
```
**Step 3:** [The Cargo First Approach](<https://github.com/esp-rs/rust-build#cargo-first-approach>)

```bash
cargo install cargo-generate
```
```bash
# STD Project
cargo generate esp-rs/esp-idf-template cargo
# NO-STD (Bare-metal) Project
cargo generate esp-rs/esp-template
```
```bash
cargo espflash flash <SERIAL>
# for me, this was cargo espflash flash --port /dev/ttyUSB0 
```

#### Internal Blink project

The standard sanity check after creating a new project is to create a project that blinks the internal led.

```rust
//! Blinks the internal led (GPIO pin 2)
//! built for ESP32
//! modified from https://github.com/esp-rs/esp-idf-hal/blob/master/examples/blinky.rs
//! by Zack Sargent

use esp_idf_hal::delay::FreeRtos;
use esp_idf_hal::gpio::*;
use esp_idf_hal::peripherals::Peripherals;

fn main() -> anyhow::Result<()> {
    /* setup - runs once on board start */
    // It is necessary to call this function once. Otherwise some patches to the runtime
    // implemented by esp-idf-sys might not link properly. See https://github.com/esp-rs/esp-idf-template/issues/71
    esp_idf_hal::sys::link_patches();

    esp_idf_svc::log::EspLogger::initialize_default(); // initalize logger

    // The `?` at the end of the following lines means:
    // "If this function returns an error, stop the main function and return that error."
    // It's like throwing an exception.

    let peripherals = Peripherals::take()?; // get list of peripherals
    let mut led = PinDriver::output(peripherals.pins.gpio2)?; // take the GPIO pin 2 as an output device

    log::info!("Connected! Blinking..");

    /* loop - equivalent to a `while(true)` loop in C++ */
    loop {
        led.set_high()?;
        FreeRtos::delay_ms(1000);

        led.set_low()?;
        FreeRtos::delay_ms(1000);
    }
}

// run with `cargo run` or `cargo espflash flash --port <SERIAL>`
```

## Connecting to WiFi

So, Rust uses Hardware Abstraction Layers (<abbr>[HAL](https://docs.rust-embedded.org/book/peripherals/a-first-attempt.html)</abbr>) to represent peripherals such as the GPIO pins above and (*hopefully*) WiFi.

There are two important ones to be aware of:

1. [`esp-idf-hal`](https://github.com/esp-rs/esp-idf-hal) ([Docs](https://esp-rs.github.io/esp-idf-hal)) - includes Rust standard library
2. [`esp-hal`](https://github.com/esp-rs/esp-hal) ([Docs](https://docs.rs/esp32-hal/latest/esp32_hal/))- no_std

but there are [many more available](https://github.com/esp-rs/esp-hal#hal-crates).

I'm totally okay with using the standard library, so I'm going to be using `esp-idf-hal` for this project.

Additionally, for connecting to WiFi, I'll be using the WiFi implementation from [`embedded_svc`](https://docs.rs/embedded-svc/latest/embedded_svc/wifi/index.html).

Specifically, my university uses WPA2 Enterprise WiFi, which this crate luckily [supports](https://docs.rs/embedded-svc/latest/embedded_svc/wifi/enum.AuthMethod.html) .

### WPA2Enterprise fights back

There's also [an example](https://github.com/esp-rs/esp-idf-svc/blob/f966704549f80a4650dd55ad9a1cd35ca0f724f6/examples/http_request.rs) for how to make an HTTP request using `embedded_svc`, and [this example](https://github.com/esp-rs/esp-idf-svc/blob/f966704549f80a4650dd55ad9a1cd35ca0f724f6/examples/tls.rs) for TLS.

I found [this tutorial](https://docs.wokwi.com/guides/esp32-wifi#connecting-from-rust-std) that details how to connect to WiFi networks.

Unfortunately, none of these work for me, because they don't illustrate WPA2 Enterprise connections. All attempts to establish a network fail with `ESP_ERR_TIMEOUT `.

Shout out to [u/semi_competent on r/esp32](https://www.reddit.com/r/esp32/comments/16zpn5c/comment/k3g1mbi/?utm_source=share&utm_medium=web2x&context=3) for mentioning this in a random post from a month ago:

> Use [ClientConfiguration](https://docs.rs/embedded-svc/latest/embedded_svc/wifi/struct.ClientConfiguration.html) with an [AuthMethod](https://docs.rs/embedded-svc/latest/embedded_svc/wifi/enum.AuthMethod.html) of "WPA2Enterprise". Edit: after calling [esp_wifi_sta_wpa2_ent_set_ca_cert](https://esp-rs.github.io/esp-idf-sys/esp_idf_sys/fn.esp_wifi_sta_wpa2_ent_set_ca_cert.html) and [esp_wifi_sta_wpa2_ent_set_cert_key](https://esp-rs.github.io/esp-idf-sys/esp_idf_sys/fn.esp_wifi_sta_wpa2_ent_set_cert_key.html).

In my experience, I needed to do a little bit more:

Just for reference, here are a few methods I've found that you might want to consider:

```rust
use esp_idf_sys::{
    esp_wifi_sta_wpa2_ent_enable, esp_wifi_sta_wpa2_ent_set_ca_cert,
    esp_wifi_sta_wpa2_ent_set_cert_key, esp_wifi_sta_wpa2_ent_set_identity,
    esp_wifi_sta_wpa2_ent_set_password, esp_wifi_sta_wpa2_ent_set_username,
};
```

Documentation links: [`esp_wifi_sta_wpa2_ent_enable`](https://esp-rs.github.io/esp-idf-sys/esp_idf_sys/fn.esp_wifi_sta_wpa2_ent_enable.html), [`esp_wifi_sta_wpa2_ent_set_ca_cert`](https://esp-rs.github.io/esp-idf-sys/esp_idf_sys/fn.esp_wifi_sta_wpa2_ent_set_ca_cert.html), [`esp_wifi_sta_wpa2_ent_set_cert_key`](https://esp-rs.github.io/esp-idf-sys/esp_idf_sys/fn.esp_wifi_sta_wpa2_ent_set_cert_key.html), [`esp_wifi_sta_wpa2_ent_set_identity`](https://esp-rs.github.io/esp-idf-sys/esp_idf_sys/fn.esp_wifi_sta_wpa2_ent_set_identity.html), [`esp_wifi_sta_wpa2_ent_set_password`](https://esp-rs.github.io/esp-idf-sys/esp_idf_sys/fn.esp_wifi_sta_wpa2_ent_set_password.html), [`esp_wifi_sta_wpa2_ent_set_username`](https://esp-rs.github.io/esp-idf-sys/esp_idf_sys/fn.esp_wifi_sta_wpa2_ent_set_username.html).

In particular, I found that I needed to set the following:

```rust
unsafe {
    esp_wifi_sta_wpa2_ent_set_username(USERNAME.as_ptr(), USERNAME.len().try_into().unwrap()); // username, NOT EMAIL
    esp_wifi_sta_wpa2_ent_set_password(PASSWORD.as_ptr(), PASSWORD.len().try_into().unwrap()); // set password
    esp_wifi_sta_wpa2_ent_enable(); // Enable WPA2 Enterprise authentication on the ESP32
}
```

You can see [the full file on GitHub](https://github.com/Norse-IoT/esp32-rust-web/blob/2388c1cc03948db42cd78685a86ba68901d170aa/src/main.rs#L71-L94).


<aside>
I've also noticed that it takes about a minute to flash the ESP32 with the program.

I'm not sure if C++ is faster, but I'm getting a little bored having to wait a minute for every small change.
</aside>

From this, I can now connect to my local development server to make requests.

### Comparison to C++

[**`env!` macro**](https://doc.rust-lang.org/std/macro.env.html)

I want to highlight the `env!` macro I'm using to pull environment variables at compile time, because I think it represents a significant advantage over the Arduino/C++ code.

C++'s `constexpr` is not able to perform I/O or system calls during compile time. However, Rust's macro system is significantly more powerful, and enables things like pulling environment variables at compile time, which aren't possible in C++.

```
error: environment variable `PASSWORD` not defined at compile time
  --> src/main.rs:30:24
   |
30 | const PASSWORD: &str = env!("PASSWORD");
   |                        ^^^^^^^^^^^^^^^^
   |
   = help: use `std::env::var("PASSWORD")` to read the variable at run time
```

This is a great experience.

**unsafe block**

Unfortunately, the `unsafe` block that I had to add is almost word-for-word the same as the C++ alternative.

In Rust:

```rust
unsafe {
    esp_wifi_sta_wpa2_ent_set_username(USERNAME.as_ptr(), USERNAME.len().try_into().unwrap()); // username, NOT EMAIL
    esp_wifi_sta_wpa2_ent_set_password(PASSWORD.as_ptr(), PASSWORD.len().try_into().unwrap()); // set password
    esp_wifi_sta_wpa2_ent_enable(); // Enable WPA2 Enterprise authentication on the ESP32
}
```

In C++:

```cpp
esp_wifi_sta_wpa2_ent_set_username((uint8_t*)EAP_IDENTITY, strlen(EAP_IDENTITY));                      //provide username
esp_wifi_sta_wpa2_ent_set_password((uint8_t*)EAP_PASSWORD, strlen(EAP_PASSWORD));                      //provide password
esp_wifi_sta_wpa2_ent_enable();
```

At this point, I find it hard to say that Rust is a *worse* experience, but I think it's important to recognize that Rust is not magic, and that it's simply providing a layer of abstraction over existing Arduino libraries. There are points at which that layer of abstraction leaks, and it's still important to understand what's going behind the scenes.

## Connecting to WebSockets

As a basis for event-driven peripherals for web applications, I'd love for my Rust client to connect to a websocket server.

`embedded-svc` provides abstract types for:

- [WebSockets](https://docs.rs/embedded-svc/latest/embedded_svc/ws/index.html)
- [MQTT](https://docs.rs/embedded-svc/latest/embedded_svc/mqtt/index.html)
- And more!

However, we need an implementation to establish the connection logic. I didn't find one. The lack of documentation confuses me.

