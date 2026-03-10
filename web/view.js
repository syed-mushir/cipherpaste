import { decrypt } from './functions.js'

const viewPaste = async () => {
    try {
        const key = window.location.hash.replace("#","");
        const id = window.location.pathname.replace("/","");
        const res = await fetch(`api/${id}`);
        const js = await res.json();
        if(js?.cipherText){
            return await decrypt(js.cipherText, key);
        }else{
            return js.message ?? "Something went wrong";
        }
    } catch (error) {
            console.error(error);
            return "Something went wrong";
    }
}
const viewportMeta = document.createElement('meta');
viewportMeta.name = 'viewport';
viewportMeta.content = 'width=device-width, initial-scale=1.0';

document.head.appendChild(viewportMeta);

const pre = document.createElement('pre');
Object.assign(pre.style, {
  backgroundColor: '#1e1e1e',
  color: '#d4d4d4',
  padding: '20px',
  margin: '0',
  fontFamily: 'monospace',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  height: '100vh',
  overflow: 'auto'
});

const dec = await viewPaste();
pre.textContent = dec;
document.body.innerHTML = '';
document.body.appendChild(pre);
