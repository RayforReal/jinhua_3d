import initShaders  from './initShaders.js';

const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

const vertexSource = `
void main(){
    gl_Position = vec4(0.5,0.0,0.0,1.0);
    gl_PointSize = 10.0;
}
`;
const fragmentSource = `
void main(){
    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
}
`;
initShaders(gl, vertexSource, fragmentSource);

// 清空canvas画布
gl.clearColor(0.5, 0.5, 0.5, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

// 画一个点
gl.drawArrays(gl.POINTS, 0, 1)
