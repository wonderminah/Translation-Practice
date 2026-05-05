import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
})

export interface FeedbackResult {
  score: number
  feedback: string
}

export async function fetchFeedback(origin: string, sentence: string): Promise<FeedbackResult> {
  const response = await client.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 256,
    messages: [{
      role: 'user',
      content: `당신은 영어 번역 튜터입니다.

한국어 원문: "${origin}"
사용자의 영어 번역: "${sentence}"

위 번역을 평가하고 아래 JSON 형식으로만 응답해주세요. 다른 텍스트는 포함하지 마세요.
{
  "score": 점수(0~100 정수),
  "feedback": "한국어로 2~3문장. 잘된 점과 개선할 점을 간결하게."
}`,
    }],
  })

  const text = response.content[0].type === 'text' ? response.content[0].text.trim() : ''
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('응답 파싱 실패')
  return JSON.parse(jsonMatch[0]) as FeedbackResult
}
