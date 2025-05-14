void main()
{
    // start

	vec2 uv0 = vUV.st;
    float ratio = iResolution.x / iResolution.y;
    vec2 uv1 = (uv0 - .5) * vec2(ratio, 1);

    // controls

    float axes = magic(iF6, iB6, 731);
    float axes_trigger = magic_b(iB6, 731).x;

    float rotation = magic(iF7, iB7, 180, 4);

    float h_scroll = magic(iF8, iB8, 167, 4);

    // logic

    vec2 uv2 = uv1;
    
    uv2 = mix(uv2, kal2(uv2 * rot(0.25), floor(axes * 9 + 1)) * vec2(1, -2) + vec2(0, -0.5), axes_trigger);    

    uv2 *= rot(rotation);

    uv2.x = (saw(uv2.x / ratio + 0.5 + h_scroll * 2) - 0.5) * ratio;

    vec3 c = frame(uv2, 0);

    // output

    float fx = magic(iF5, vec3(1, 1, 0), 0, 4);
    c = mix(frame(uv1, 0), c, fx);

    fragColor = TDOutputSwizzle(vec4(c, 1.));
}