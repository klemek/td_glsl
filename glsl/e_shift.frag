void main()
{
    // start

	vec2 uv0 = vUV.st;
    float ratio = iResolution.x / iResolution.y;
    vec2 uv1 = (uv0 - .5) * vec2(ratio, 1);

    // controls

    float zoom = magic(iF6, iB6, 343, 4);

    float x_shift = magic(iF7, iB7, 716, 4);

    float y_shift = magic(iF8, iB8, 555, 4);

    // logic

    vec2 uv2 = uv1;

    uv2 = mix(uv2 * (1 + zoom * 2), uv2 * (zoom), step(0.5, zoom));

    uv2 += vec2(x_shift * ratio, y_shift) * 2;

    vec3 c = frame(uv2, 0);

    // output

    float fx = magic(iF5, vec3(1, 1, 0), 0, 4);
    c = mix(frame(uv1, 0), c, fx);

    fragColor = TDOutputSwizzle(vec4(c, 1.));
}