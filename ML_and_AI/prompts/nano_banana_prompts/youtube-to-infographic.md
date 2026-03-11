# YouTube Video to Sketch Note Infographic

A two-prompt system that turns any long-form YouTube video into a beautiful, one-page sketch note summary in about 60 seconds. Uses Google Gemini's native YouTube integration.

**Platform:** Google Gemini (requires YouTube connected in Gemini settings)

## How It Works

The key insight is **splitting summarization and visualization into two separate prompts**. Trying to do both in one prompt produces mediocre results. Two focused steps = consistently high quality.

1. **Prompt 1** — Extract actionable steps from the video
2. **Review & edit** the summary (optional but recommended)
3. **Prompt 2** — Visualize the summary as a whiteboard sketch note

---

## Prompt 1: The Summarizer

Feed this to Gemini with a YouTube URL.

```
Analyze this YouTube video about [TOPIC]: [YOUTUBE_URL].
Summarize the core concepts into a list of 5-7 direct, actionable steps.
Each step should be a clear, concise instruction.
Keep the language simple and direct.
```

### Parameters

| Placeholder | Description | Examples |
|-------------|-------------|----------|
| `[TOPIC]` | Subject of the video | productivity, machine learning, cooking |
| `[YOUTUBE_URL]` | Full YouTube link | `https://www.youtube.com/watch?v=...` |

### Between Prompts

Before moving to Prompt 2, **read the summary and edit it**:
- Rephrase points for clarity
- Add your own insights
- Remove anything irrelevant
- Ensure exactly 5-7 points for visual balance

---

## Prompt 2: The Visualizer

Feed the edited summary into this prompt.

```
Visualize the summary of these notes. Create a realistic photograph of a
dry-erase whiteboard with a light wooden frame. The content should be
presented as a hand-drawn sketchnote using 'graphic recording' style.
The layout should be in 9:16 format.

Style & Layout Guidelines:
- Medium: Whiteboard surface with dry-erase markers (not paper).
- Colors: Use Black for outlines, boxes, and main text. Use Red, Blue,
  and Green for headers and specific accents.
- Structure: Place the title "[TITLE]" at the top in large, open lettering.
  Organize the notes into five distinct, numbered rectangular boxes arranged
  in a grid below the title.
- Visuals: Include relevant simple line-drawing doodles for each point.
- Typography: Text should be distinct, handwritten, all-caps printing,
  legible and organized.
- Environment: Include a used whiteboard eraser and a few colorful
  EXPO-style markers resting on the bottom wooden ledge of the frame.
```

### Parameters

| Placeholder | Description | Examples |
|-------------|-------------|----------|
| `[TITLE]` | Headline for the infographic — make it compelling | "7 Steps to Better Sleep", "How Git Actually Works" |

---

## Top Use Cases

| Use Case | Input | Output |
|----------|-------|--------|
| University lectures | 90-min lecture recording | One-page study guide |
| Conference talks | Keynote / session video | Key insights summary |
| Podcast episodes | Video version of a podcast | Visual episode recap |
| Software tutorials | Long how-to video | Actionable cheat sheet |
| Social media content | Expert interview | Shareable infographic |

---

## Why This Works — Key Secrets

### Two prompts, not one
The single biggest mistake is trying to summarize and visualize in one shot. The AI loses focus. Separating the tasks is non-negotiable for consistent results.

### Constrain to 5-7 points
Forces visual balance and digestibility. Too many points = clutter.

### Specify the physical medium
Describing "dry-erase whiteboard with a light wooden frame" plus props like the "eraser and EXPO-style markers" grounds the AI in a physical object, producing far more realistic output.

### Strict color palette
Black for structure, Red/Blue/Green for accents. Limited palette = easier to parse, more professional look.

### Use the term "graphic recording"
This specific style keyword triggers the right mix of handwritten text and simple doodles — the essence of effective sketch notes.

### The title is your headline
`[TITLE]` is the first thing viewers read. Treat it like a social media headline — strong, clear, compelling.
