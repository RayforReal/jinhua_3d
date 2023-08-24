const fragmentShader =/* css */ `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_sampler;

void main(){
    gl_FragColor = texture2D(u_sampler,v_uv);
}
`;

export default fragmentShader
