(() => {
  const execCopy = (string) => {
    const tmp = document.createElement('div');
    const pre = document.createElement('pre');
    pre.style.webkitUserSelect = 'auto';
    pre.style.userSelect = 'auto';
    tmp.appendChild(pre).textContent = string;
    const s = tmp.style;
    s.position = 'fixed';
    s.right = '200%';
    document.body.appendChild(tmp);
    document.getSelection().selectAllChildren(tmp);
    const result = document.execCommand('copy');
    document.body.removeChild(tmp);
    return result;
  };
  if (document.getElementsByClassName('addCopyButton'))
    document.querySelectorAll('button.addCopyButton').forEach((item) => {
      item.remove();
    });
  document
    .querySelectorAll(
      'td.text-violet-600,td.text-purple-700,span.code-highlight'
    )
    .forEach((item) => {
      const text = item.textContent.trim();
      const ele = document.createElement('button');
      ele.className =
        'addCopyButton border border-gray-200 bg-gray-100 text-sm text-gray-500 ml-2 px-1.5 py-0.5 rounded focus:outline-none';
      ele.innerHTML = `<div class="w-2 h-2"><svg class="fill-current text-gray-500" viewBox="0 0 67 67" xmlns="http://www.w3.org/2000/svg">
     <path d="M61.559,16.528L44.432,0.713C44.064,0.377,43.583,0,43.083,0H25.446c-5.407,0-9.134,2.81-9.134,6.877V12h-3.358
       c-4.946,0-8.642,3.124-8.642,7.369V59.37c0,4.492,4.077,7.63,8.642,7.63h29.231c4.677,0,8.127-3.288,8.127-7.63V55h4.365
       c4.41,0,7.635-3.513,7.635-8.122V18.555c0-0.029,0.242-0.057,0.241-0.085c0.001-0.03,0.134-0.059,0.134-0.089
       C62.688,17.541,62.293,16.824,61.559,16.528z M44.312,6.665L55.462,16H44.312V6.665z M46.312,59.37c0,2.363-1.938,3.63-4.127,3.63
       H12.955c-2.323,0-4.642-1.381-4.642-3.63V19.369c0-2.6,3.095-3.369,4.642-3.369h15.358v15.381c0,1.104,1.396,1.619,2.5,1.619h15.5
       V59.37z M44.028,29H32.312v-9.878L44.028,29z M54.677,51h-4.365V31.047c0-0.562,0.014-1.097-0.4-1.476l-17.43-16.059
       c-0.324-0.667-0.94-1.132-1.732-1.132c-0.036,0-0.039-0.182-0.075-0.18c-0.038-0.002-0.044-0.201-0.083-0.201h-10.28V6.876
       c0-2.063,3.02-2.877,5.134-2.877h14.866V18.38c0,1.104,1.396,1.619,2.5,1.619h15.5v26.878C58.312,49.276,56.881,51,54.677,51z"/>
 </svg></div>`;
      ele.title = text;
      ele.value = text;
      ele.onclick = (e) => {
        console.log(text);
        execCopy(text);
      };
      item.appendChild(ele);
    });
})();
