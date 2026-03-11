# Glass Sculpture

Hyper-realistic glass sculpture prompt with full light refraction, volumetric caustics, and multiple configurable parameters for subject, background, lighting, and lens.

## Prompt Template

```
A hyper-realistic, optically pure glass sculpture of {{Subject}}, meticulously detailed,
defined only by the extreme light refraction and volumetric caustics passing through it.

The sculpture should be placed on a {{Background}} background, catching {{Lighting}} light,
creating mesmerizing, rainbow-hued patterns on the surface beneath.

Shot on {{Camera Lens}} lens, shallow depth of field, minimalist and elegant.
```

## Parameters

### Subject

The form of the glass sculpture. Examples:

- A Maine Coon cat
- The sculpture of DAVID by Michelangelo
- The THINKER by Rodin
- A willow tree
- The person on the attached photo *(note: hide the teeth or shut the mouth for best results with portraits)*

### Background

| Option | Mood |
|--------|------|
| Simple black velvet | Dark, dramatic, gallery feel |
| Pure white studio | Clean, commercial, minimal |
| Dark slate | Moody, textured, editorial |
| Illuminated pedestal | Museum exhibit, spotlight focus |
| Stylish New York penthouse with night city view | Luxury, lifestyle, aspirational |

### Lighting

| Option | Effect |
|--------|--------|
| Golden hour | Warm, amber tones, long caustics |
| Dramatic studio | High contrast, sharp refractions |
| Neon cyberpunk glow | Vibrant, colorful, futuristic |
| Soft morning | Gentle, diffused, pastel caustics |

### Camera Lens

| Option | Character |
|--------|-----------|
| 100mm macro | Extreme detail, tight crop |
| 50mm portrait | Natural perspective, balanced |
| 35mm wide angle | Environmental, shows full scene |
| 85mm prime | Classic portrait compression, smooth bokeh |

## Tips

- Combining **black velvet** + **dramatic studio lighting** + **100mm macro** produces the most striking caustic patterns
- For portraits from photos, closing the mouth avoids uncanny-valley artifacts in glass rendering
- The prompt works across Midjourney, DALL-E, and Stable Diffusion — adjust `--ar` or resolution as needed
