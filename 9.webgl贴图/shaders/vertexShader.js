
const vertexShader = `
attribute vec3 a_position;
attribute vec2 a_uv;
varying vec2 v_uv;

void main(){
    v_uv=a_uv;
    gl_Position = vec4(a_position,1.0);
}
`;

export default vertexShader;
/**
 * glsl es
 * 区分大小写， 以分号结尾，注释，
 *
 * 数据类型（简单）
 * 数字 int, float，布尔bool true, false
 * 1 = 1.0
 * 类型转换： int, float, bool
 * float(int), float(bool)
 * int(float), init(bool)
 * bool(int), bool(float)
 *
 * 变量
 * 变量名，变量的声明: 数据类型 变量名 值；
 *
 * 计算
 * + - * / 前后的类型一致
 * ++ -- += -= *= /=
 *
 * 数据类型(复杂)
 * (1)向量Vector, vec2, vec3, vec4
 * vec4 color = vec4(1.0, 1.0, 1.0, 1.0);
 * color.x, color.y, color.z， color.w
 * color.r, color.g, color.b， color.a
 * color.s, color.t, color.p, color.q
 *
 * (2)矩阵Matrix，mat2, mat3, mat4
 * mat4 translateMatirx = mat4(
 * 1.0, 0.0, 0.0, 0.0,
 * 0.0, 1.0, 0.0, 0.0,
 * 0.0, 0.0, 1.0, 0.0,
 * 0.5, 0.0, 0.0, 1.0,
 * )
 *
 * 循环，条件
 *
 * 函数
 * 自定义函数，内置的函数
 */
