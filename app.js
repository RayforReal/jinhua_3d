import initShaders from './initShaders.js';

const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

const vertexShader = `
attribute vec2 a_position;
uniform float u_size;
varying vec2 v_position;

void main(){
    v_position = a_position;
    gl_Position = vec4(a_position,0.0,1.0);
    gl_PointSize = u_size;
}
`;
const fragmentShader = `
precision mediump float;
uniform vec2 u_color;
varying vec2 v_position;

void main(){
    gl_FragColor = vec4(v_position,u_color);
}
`;

initShaders(gl, vertexShader, fragmentShader);

// 清空canvas画布
gl.clearColor(0.5, 0.5, 0.5, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

// js传值到shader中的三种方式
// (1) attribute(js->vertexShader)
const a_position = gl.getAttribLocation(gl.program,'a_position');
gl.vertexAttrib2f(a_position,0.5,0.5,)

// (2) uniform(js->vertexShader,js->fragmentShader)
const u_color = gl.getUniformLocation(gl.program,'u_color');
gl.uniform2f(u_color,0.0,0.8);
const u_size = gl.getUniformLocation(gl.program,'u_size');
gl.uniform1f(u_size,10.0)

//(3) varying (vertexShader->fragmentShader)
// 在vertexShader和fragmentShader中都使用varying声明同一变量名称

// 画一个点
gl.drawArrays(gl.POINTS, 0, 1)




