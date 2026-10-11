// Any button with a data-copy attribute copies that text and shows a tick for a moment.
// Delegated, so it needs no Blazor runtime and survives the DOM swap on a .NET host.
(function () {
    'use strict';

    document.addEventListener('click', function (e) {
        var button = e.target.closest && e.target.closest('[data-copy]');
        if (!button) return;
        var text = button.getAttribute('data-copy');
        var writeText = navigator.clipboard && navigator.clipboard.writeText
            ? navigator.clipboard.writeText(text)
            : Promise.reject(new Error('clipboard unavailable'));

        writeText.then(function () {
            button.classList.add('copied');
            setTimeout(function () { button.classList.remove('copied'); }, 1400);
        }).catch(function () {
            // No clipboard access: select the text next to the button so Ctrl+C works.
            var code = button.parentElement && button.parentElement.querySelector('code');
            if (!code) return;
            var range = document.createRange();
            range.selectNodeContents(code);
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        });
    });
})();
