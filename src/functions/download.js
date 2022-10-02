export default function download(filename, elements) {
  console.log(elements);
  //   return;
  var template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <style>
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }
  </style>
  <body style="position: relative; width: 100%; height: 100vh">
`;
  for (let i = 0; i < elements.length; i++) {
    template += `<div style="position: absolute; left: ${elements[i].position.left}px; top: ${elements[i].position.top}px;">${elements[i].data}</div>`;
  }
  template += `
    </body>
  </html>
  `;
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/html;charset=utf-8," + encodeURIComponent(template)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
