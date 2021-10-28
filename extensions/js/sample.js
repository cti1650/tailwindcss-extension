(()=>{
  const execCopy = (string) => {
    const tmp = document.createElement("div");
    const pre = document.createElement('pre');
    pre.style.webkitUserSelect = 'auto';
    pre.style.userSelect = 'auto';
    tmp.appendChild(pre).textContent = string;
    const s = tmp.style;
    s.position = 'fixed';
    s.right = '200%';
    document.body.appendChild(tmp);
    document.getSelection().selectAllChildren(tmp);
    const result = document.execCommand("copy");
    document.body.removeChild(tmp);
    return result;
  }
  if(document.getElementsByClassName('addCopyButton'))
    document.querySelectorAll('button.addCopyButton').forEach(item=>{
      item.remove();
    });
  document.querySelectorAll('td.text-violet-600').forEach(item=>{
    console.log(item.textContent)
    const ele = document.createElement('button');
    ele.className = "addCopyButton border border-gray-200 bg-gray-100 text-gray-500 ml-2 px-2 py-0.5 rounded focus:outline-none"
    ele.innerText = "copy";
    ele.title = item.textContent;
    ele.value = item.textContent;
    ele.addEventListener('click',(e)=>{
      execCopy(e.target.value);
    });
    item.appendChild(ele);
  })
})();
