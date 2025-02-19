void main()
{
	vec2 uv0 = vUV.st;

    vec2 uv1 = (uv0 - .5) * vec2(iResolution.x / iResolution.y, 1);

    vec2 uv = uv1;

    uv.y *= cos(uv.x * 5 * magic(iF3, iB3, 847));

    uv *= rot(magic(iF2, iB2, 853) + 0.1 * iTime);

    float k = magic(iF1, iB1, 432) * 2;

    uv.y = cmod(uv.y, k * 2 + 0.1);

    float f = step(uv.y, k * 0.125 + 0.05) * step(-uv.y, k * 0.125 + 0.01);

    vec3 c = f * mix(vec3(1), col(magic(iF4, iB4, 859)), iB4.x);

    fragColor = TDOutputSwizzle(vec4(c, 1.));
}