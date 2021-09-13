const tailwindcssExtension = chrome.contextMenus.create({
  id: 'tailwindcss-extension',
  title: 'Tailwindcss',
  type: 'normal',
  contexts: ['all'],
  onclick: (info, tab) => {
    window.open('https://tailwindcss.com/docs', '_blank');
  },
});
