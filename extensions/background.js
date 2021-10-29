'use strict';

{
  chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
      type: 'normal',
      id: 'tailwindcss-extension',
      title: 'Tailwindcss',
      contexts: ['all'],
    });
  });

  // メニューをクリック時に実行
  chrome.contextMenus.onClicked.addListener((info) => {
    console.log(info);
    if (info.menuItemId === 'tailwindcss-extension') {
      chrome.windows.create({
        url: 'https://tailwindcss.com/docs',
        type: 'popup',
        width: 700,
        height: 700,
      });
    }
  });

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    let url = tab.url;
    console.log(url);
    if (!~url.indexOf('https://tailwindcss')) return;
    if (changeInfo.status !== 'complete') return;
    console.log('add Script');
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId, allFrames: true },
        files: ['js/sample.js'],
      },
      () => {}
    );
  });
}
