void main()
{
	vec2 uv0 = vUV.st;
    float ratio = iResolution.x / iResolution.y;
    vec2 uv1 = (uv0 - .5) * vec2(ratio, 1);

    float f = magic(iF1, vec3(1, 1, 0), 0, 4);

    float k = mean(frame(uv1, 0));

    vec3 c = mix(frame(uv1, 1), frame(uv1, 0), mix(f, step(f, k), iB1.y));

    fragColor = TDOutputSwizzle(vec4(c, 1.));
}