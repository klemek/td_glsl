import os

SENTENCES = [
    # "Klemek",
    # "Everything you see",
    # "Pixel by pixel",
    # "Live",
    # "Generated",
    # "Controlled",
    # "(Even this text)",
    # "This is my code,",
    # "This is my art. ",
    # "Enjoy",
    # "Lille VJ Fest",
    "beLow",
    "beLow beLow beLow",
    "C'est la teuf",
    "Lille VJ Fest",
    "Pour les yeux",
    "Pour les oreilles",
    "Machines",
    "Sauvages",
    "Drum & Drum",
    "V8 + Shaders + Cam.",
]

#   "                    "

def convert(txt):
    out = []
    for i in range(20):
        out += [str(ord(txt[i])) if i < len(txt) else str(0)]
    return f"{{{', '.join(out)}}}"

print(len(SENTENCES))

with open(os.path.join(os.path.dirname(__file__), "sentences.frag"), mode='w') as output:
    output.write(f"#define SENTENCE_COUNT {len(SENTENCES)}\n\n")
    output.write("const int sentences[SENTENCE_COUNT][20] = {\n")
    for sentence in SENTENCES:
        output.write("    " + convert(sentence) + ",\n")
    output.write("};\n\n")
    output.write("const int lengths[SENTENCE_COUNT] = {\n")
    output.write("    " + ', '.join(str(len(sentence)) for sentence in SENTENCES) + "\n")
    output.write("};\n\n")