import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PhaseChecklist } from './PhaseChecklist'
import { mockPhases, mockLlmComponents } from '../test/fixtures'

describe('PhaseChecklist', () => {
  it('renders all phase names', () => {
    render(<PhaseChecklist phases={mockPhases} />)
    expect(screen.getByText('Phase 1: Classical NLP')).toBeInTheDocument()
    expect(screen.getByText('Phase 2: Embeddings')).toBeInTheDocument()
  })

  it('shows item count per phase', () => {
    render(<PhaseChecklist phases={mockPhases} />)
    expect(screen.getByText('1/2')).toBeInTheDocument()
    expect(screen.getByText('0/1')).toBeInTheDocument()
  })

  it('first phase is expanded by default', () => {
    render(<PhaseChecklist phases={mockPhases} />)
    expect(screen.getByText('BOW')).toBeInTheDocument()
    expect(screen.getByText('TF-IDF')).toBeInTheDocument()
  })

  it('shows item details when expanded', () => {
    render(<PhaseChecklist phases={mockPhases} />)
    expect(screen.getByText('vectorize in numpy')).toBeInTheDocument()
    expect(screen.getByText('from scratch')).toBeInTheDocument()
  })

  it('second phase items are hidden by default', () => {
    render(<PhaseChecklist phases={mockPhases} />)
    expect(screen.queryByText('word2vec')).not.toBeInTheDocument()
  })

  it('toggles phase open/close on click', async () => {
    const user = userEvent.setup()
    render(<PhaseChecklist phases={mockPhases} />)

    await user.click(screen.getByText('Phase 2: Embeddings'))
    expect(screen.getByText('word2vec')).toBeInTheDocument()

    await user.click(screen.getByText('Phase 2: Embeddings'))
    expect(screen.queryByText('word2vec')).not.toBeInTheDocument()
  })

  it('closes current phase when opening another', async () => {
    const user = userEvent.setup()
    render(<PhaseChecklist phases={mockPhases} />)

    expect(screen.getByText('BOW')).toBeInTheDocument()

    await user.click(screen.getByText('Phase 2: Embeddings'))
    expect(screen.queryByText('BOW')).not.toBeInTheDocument()
    expect(screen.getByText('word2vec')).toBeInTheDocument()
  })

  it('applies line-through to done items', () => {
    render(<PhaseChecklist phases={mockPhases} />)
    const bowEl = screen.getByText('BOW')
    expect(bowEl).toHaveClass('line-through')
  })

  it('does not apply line-through to not_started items', () => {
    render(<PhaseChecklist phases={mockPhases} />)
    const tfidfEl = screen.getByText('TF-IDF')
    expect(tfidfEl).not.toHaveClass('line-through')
  })

  it('renders LLM Components section when provided', () => {
    render(<PhaseChecklist phases={mockPhases} llmComponents={mockLlmComponents} />)
    expect(screen.getByText('LLM Components')).toBeInTheDocument()
    expect(screen.getByText('2/3')).toBeInTheDocument()
  })

  it('LLM Components are collapsed by default', () => {
    render(<PhaseChecklist phases={mockPhases} llmComponents={mockLlmComponents} />)
    expect(screen.queryByText('Attention Mechanism')).not.toBeInTheDocument()
  })

  it('expands LLM Components on click', async () => {
    const user = userEvent.setup()
    render(<PhaseChecklist phases={mockPhases} llmComponents={mockLlmComponents} />)

    await user.click(screen.getByText('LLM Components'))
    expect(screen.getByText('Attention Mechanism')).toBeInTheDocument()
    expect(screen.getByText('Positional Encoding')).toBeInTheDocument()
    expect(screen.getByText('Tokenization')).toBeInTheDocument()
  })

  it('does not render LLM section when not provided', () => {
    render(<PhaseChecklist phases={mockPhases} />)
    expect(screen.queryByText('LLM Components')).not.toBeInTheDocument()
  })

  it('does not render LLM section for empty array', () => {
    render(<PhaseChecklist phases={mockPhases} llmComponents={[]} />)
    expect(screen.queryByText('LLM Components')).not.toBeInTheDocument()
  })

  it('handles empty phases array', () => {
    const { container } = render(<PhaseChecklist phases={[]} />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
