void main()
{
    // start

	vec2 uv0 = vUV.st;
    float ratio = iResolution.x / iResolution.y;
    vec2 uv1 = (uv0 - .5) * vec2(ratio, 1);

    // controls

    float mix_src = magic(iF1, vec3(1, 1, 0), 0, 4);

    // logic

    float k = mean(frame(uv1, 0));

    vec3 c = mix(frame(uv1, 1), frame(uv1, 0), mix(mix_src, step(mix_src, k), iB1.y));

    // output

    fragColor = TDOutputSwizzle(vec4(c, 1.));
}