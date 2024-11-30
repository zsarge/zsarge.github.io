# dependencies for this project:
echo "I assume you have git, npm, and ruby."

echo "installing pandoc"
echo https://pandoc.org/installing.html
sudo dnf -y install pandoc

echo "installing mermaid filter"
sudo npm install --global mermaid-filter