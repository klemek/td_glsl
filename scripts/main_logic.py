# me - this DAT
# 
# channel - the Channel object which has changed
# sampleIndex - the index of the changed sample
# val - the numeric value of the changed sample
# prev - the previous sample value
# 
# Make sure the corresponding toggle is enabled in the CHOP Execute DAT.

MIDI_RAW = 'midiinmap1'
MIDI_FIXED = 'midi'

DST_ALL = 'table_all'
BTN_OFFSET = 16

PAGES = ['b33', 'b34', 'b35']
ITEMS = ['b27', 'b28', 'b26', 'b25', 'b29']

SELECTED_MAP = ['b1', 'b17', 'b5', 'b13', 'b21']
NAMES_MAP = ['srca', 'srcb', 'fx1', 'fx2', 'fx3']

DST_SELECTED = 'table_selected'
SRC_SELECTED = 'selected'

page = 0
selected = 0

# OLD
DST = 'table1'
MODE = 'b33'
PAGE = 'b29'
MAPPING = ['b27', 'b28', 'b26', 'b25']

def onOffToOn(channel, sampleIndex, val, prev):
    global page, selected
    if channel.name.startswith('b'):
        row_index = int(channel.name[1:]) - 1
        trig(DST_ALL, row_index + BTN_OFFSET, 1)
        name = NAMES_MAP[selected]
        trig(f"table_{name}", row_index + BTN_OFFSET, 1)
        # op(f"table_{name}")[channel.name] = v
    if channel.name in SELECTED_MAP:
        selected = SELECTED_MAP.index(channel.name)
    elif channel.name in PAGES:
        page = PAGES.index(channel.name)
    elif channel.name in ITEMS:
        op(DST_SELECTED)[selected, 1] = str(page * 5 + ITEMS.index(channel.name) + 1)
    # old
    if channel.name in MAPPING:
        trig(DST, int(op(MIDI_FIXED)[MODE]) * 2 + int(op(MIDI_FIXED)[PAGE]), MAPPING.index(channel.name))
    return

# def whileOn(channel, sampleIndex, val, prev):
# 	return

# def onOnToOff(channel, sampleIndex, val, prev):
# 	return

# def whileOff(channel, sampleIndex, val, prev):
# 	return

def trig(dst, row, col):
    v = '1' if op(dst)[row, col].val == '0' else '0'
    op(dst)[row, col].val = v
    return int(v)

def onValueChange(channel, sampleIndex, val, prev):
    if channel.name.startswith('s'):
        row_index = int(channel.name[1:]) - 1
        op(DST_ALL)[row_index, 1] = val
        name = NAMES_MAP[selected]
        op(f"table_{name}")[row_index, 1] = val
    return
    