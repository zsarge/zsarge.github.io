// trip-2025/ShareMessageTLDR.tsx

import React, { useEffect, useState } from 'react';

export default function ShareMessageTLDR() {
  const [shouldShare, setShouldShare] = useState(false);

  useEffect(() => {
	const params = new URLSearchParams(window.location.search);
	if (params.get('share')) {
	  setShouldShare(true);
	}
  }, []);

  if (!shouldShare) return null;

  return (
	<div class="rounded-xl border-l-4 border-yellow-500 bg-yellow-100 text-yellow-800 px-4 py-1 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-400 mb-3">
	  <p><strong>Thanks for clicking my link!</strong></p>
	  <p>Just a heads up:</p>
	  <ul>
		<li>There's &gt;30 minutes of content to read across all the articles.</li>
		<li>I just wanted to share what I've been up to. 😄</li>
	  </ul>
	</div>
  );
}

