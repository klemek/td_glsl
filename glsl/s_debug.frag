void main()
{
	// start

	vec2 uv0 = vUV.st;
    float ratio = iResolution.x / iResolution.y;
    vec2 uv1 = (uv0 - .5) * vec2(ratio, 1);

    // inputs

    int selected = int(iF1.x * 6);
    int selected_srca = int(iF2.x * 16);
    int selected_srcb = int(iF3.x * 16);
    int selected_fx1 = int(iF4.x * 16);
    int selected_fx2 = int(iF5.x * 16);
    int selected_fx3 = int(iF6.x * 16);
    int page = int(iF7.x * 5 + 1);
    int selected_src = int(iF8.x * 6);
    int selected_fx = int(iF1.y * 6);
    float fx1_value = iF2.y;
    float fx2_value = iF3.y;
    float fx3_value = iF4.y;
    float mix_value = iF5.y;
    float mix_type = iB1.x;

    // logic

    vec2 uv2 = uv1;

    uv2 *= 10;
    uv2.x -= 0.5;
    uv2.y += 0.5;

    // base frame
    float f = 
        h_rect(uv2, vec2(-5, -2), vec2(1), 0.1) +
        h_rect(uv2, vec2(-2, -2), vec2(1), 0.1) +
        rect(uv2, vec2(-3.5, -2), vec2(0.5, 0.1)) +
        h_rect(uv2, vec2(-5, 2), vec2(1), 0.1) +
        h_rect(uv2, vec2(-2, 2), vec2(1), 0.1) +
        rect(uv2, vec2(-3.5, 2), vec2(0.5, 0.1)) +
        h_rect(uv2, vec2(2, 0), vec2(1), 0.1) +
        h_rect(uv2, vec2(5, 0), vec2(1), 0.1) +
        rect(uv2, vec2(3.5, 0), vec2(0.5, 0.1)) +
        rect(uv2, vec2(0.55, -2), vec2(1.5, 0.1)) +
        rect(uv2, vec2(2, -1.55), vec2(0.1, 0.55)) +
        rect(uv2, vec2(0.55, 2), vec2(1.5, 0.1)) +
        rect(uv2, vec2(2, 1.55), vec2(0.1, 0.55)) +
        rect(uv2, vec2(7.5, 0), vec2(1.5, 0.1)) +
        h_rect(uv2, vec2(-9, 5.1), vec2(1), 0.1);

    // show selected src/fx
    f += char_at(uv2, vec2(-5.4, 1.45), hex_chars[selected_srca]);
    f += char_at(uv2, vec2(-5.4, -2.55), hex_chars[selected_srcb]);
    f += char_at(uv2, vec2(-2.4, 1.45), hex_chars[selected_fx1]);
    f += char_at(uv2, vec2(4.6, -0.55), hex_chars[selected_fx2]);
    f += char_at(uv2, vec2(-2.4, -2.55), hex_chars[selected_fx3]);

    // show current selected
    f += selected == 0 ? h_rect(uv2, vec2(-5, 2), vec2(1.2), 0.1) : 0;
    f += selected == 1 ? h_rect(uv2, vec2(-5, -2), vec2(1.2), 0.1) : 0;
    f += selected == 2 ? h_rect(uv2, vec2(-2, 2), vec2(1.2), 0.1) : 0;
    f += selected == 3 ? h_rect(uv2, vec2(5, 0), vec2(1.2), 0.1) : 0;
    f += selected == 4 ? h_rect(uv2, vec2(-2, -2), vec2(1.2), 0.1) : 0;

    // show selected src/fx
    f += selected_src == 0 ? h_rect(uv2, vec2(-5, 0.8), vec2(1, 0), 0.1) : 0;
    f += selected_src == 1 ? h_rect(uv2, vec2(-5, -3.2), vec2(1, 0), 0.1) : 0;
    f += selected_fx == 2 ? h_rect(uv2, vec2(-2, 0.8), vec2(1.2, 0), 0.1) : 0;
    f += selected_fx == 3 ? h_rect(uv2, vec2(5, -1.2), vec2(1, 0), 0.1) : 0;
    f += selected_fx == 4 ? h_rect(uv2, vec2(-2, -3.2), vec2(1, 0), 0.1) : 0;

    // show inputs / feedback
    f += selected_srca == 0 ? rect(uv2, vec2(-8, 2), vec2(2, 0.1)) : 0;
    f += selected_srca == 1 ? rect(uv2, vec2(-6.5, 2), vec2(0.5, 0.1)) + rect(uv2, vec2(0, 4), vec2(7, 0.1)) + rect(uv2, vec2(-7, 3), vec2(0.1, 1.1)) + rect(uv2, vec2(7, 2), vec2(0.1, 2.1)) : 0;
    f += selected_srcb == 0 ? rect(uv2, vec2(-8, -2), vec2(2, 0.1)) : 0;
    f += selected_srcb == 1 ? rect(uv2, vec2(-6.5, -2), vec2(0.5, 0.1)) + rect(uv2, vec2(0, -4), vec2(7, 0.1)) + rect(uv2, vec2(-7, -3), vec2(0.1, 1.1)) + rect(uv2, vec2(7, -2), vec2(0.1, 2.1)) : 0;

    // show page
    f += char_at(uv2, vec2(-9.1, 4.3), hex_chars[page]);

    // show fx values
    f = mix(f, 1 - f, rect(uv2, vec2(-2, 1.1 + 0.9 * fx1_value), vec2(0.9, 0.9 * fx1_value)));
    f = mix(f, 1 - f, rect(uv2, vec2(5, -0.9 + 0.9 * fx2_value), vec2(0.9, 0.9 * fx2_value)));
    f = mix(f, 1 - f, rect(uv2, vec2(-2, -2.9 + 0.9 * fx3_value), vec2(0.9, 0.9 * fx3_value)));

    // show mix
    f += char_at(uv2, vec2(1.55, -0.6), mix_type > 0 ? 0x4B : 0x4D);
    f = mix(f, 1 - f, rect(uv2, vec2(2, -0.9 + 0.9 * mix_value), vec2(0.9, 0.9 * mix_value)));

    // output

    fragColor = TDOutputSwizzle(vec4(f, f, f,1.));
}