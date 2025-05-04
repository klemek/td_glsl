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

SRC_MAP = ['b1', 'b17']
FX_MAP = ['b5', 'b13', 'b21']
SELECTED_MAP = SRC_MAP + FX_MAP
NAMES_MAP = ['srca', 'srcb', 'fx1', 'fx2', 'fx3']

DST_SELECTED = 'table_selected'

SRC_FILTER = ['b2', 'b3', 'b4', 'b10', 'b11', 'b12', 'b18', 'b19', 'b20', 's2', 's3', 's4', 's10', 's11', 's12']
FX_FILTER = ['b6', 'b7', 'b8', 'b14', 'b15', 'b16', 'b22', 'b23', 'b24', 's5', 's6', 's7', 's8', 's13', 's14', 's15']

page = 0
selected = 0
selected_src = 0
selected_fx = 0

def onOffToOn(channel, sampleIndex, val, prev):
    global page, selected, selected_src, selected_fx
    if channel.name.startswith('b'):
        row_index = int(channel.name[1:]) - 1
        trig(DST_ALL, row_index + BTN_OFFSET, 1)
        if channel.name in SRC_FILTER:
            trig(f"table_{NAMES_MAP[selected_src]}", row_index + BTN_OFFSET, 1)
        elif channel.name in FX_FILTER:
            trig(f"table_{NAMES_MAP[selected_fx]}", row_index + BTN_OFFSET, 1)
    if channel.name in SRC_MAP:
        selected = SELECTED_MAP.index(channel.name)
        selected_src = SELECTED_MAP.index(channel.name)
    elif channel.name in FX_MAP:
        selected_fx = SELECTED_MAP.index(channel.name)
    elif channel.name in PAGES:
        page = PAGES.index(channel.name)
    elif channel.name in ITEMS:
        op(DST_SELECTED)[selected, 1] = str(page * 5 + ITEMS.index(channel.name))
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
        if channel.name in SRC_FILTER:
            op(f"table_{NAMES_MAP[selected_src]}")[row_index, 1] = val
        elif channel.name in FX_FILTER:
            op(f"table_{NAMES_MAP[selected_fx]}")[row_index, 1] = val
    return
    