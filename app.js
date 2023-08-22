import initShaders from './initShaders.js';

const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

const vertexShader = `
attribute vec2 a_position;
attribute float a_size;
void main(){
    gl_Position = vec4(a_position,0.0,1.0);
    gl_PointSize = a_size;
}
`;
const fragmentShader = `
void main(){
    gl_FragColor = vec4(1.0,1.0,0.0,1.0);
}
`;

initShaders(gl, vertexShader, fragmentShader);

// 清空canvas画布
gl.clearColor(0.5, 0.5, 0.5, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)


let x = 0, y = 0;
for (let i = 0; i < 900; i++) {
    const r = i / 1000;
    x = r * Math.sin(i)
    y = r * Math.cos(i)

    const position = gl.getAttribLocation(gl.program, 'a_position');
    gl.vertexAttrib2f(position, x, y);

    const size = gl.getAttribLocation(gl.program, 'a_size');
    gl.vertexAttrib1f(size, r * 4);
    // 画一个点
    gl.drawArrays(gl.POINTS, 0, 1)
}








