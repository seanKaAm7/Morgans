# 개인 일정 매니저 음성 콜 앱 계획서 v3.1

수정일: 2026-06-23

## 0. 한 줄 정의

사용자가 AI 매니저와 짧게 통화하면서 하루 일정, 루틴, 마감, 다음 행동을 정리하는 iPhone 앱.

이 앱은 상담 앱이 아니다. 실제 전화망으로 전화를 거는 앱도 아니다. 핵심은 사용자가 직접 매니저에게 전화를 걸거나 예약된 콜을 받고, 짧은 음성 대화로 스케줄 action을 처리하는 것이다.

---

## 1. 제품 원칙

### 1.1 AI 역할

AI는 개인 일정 매니저다.

AI가 하는 일:

- 일정 확인
- 루틴 상태 확인
- 우선순위 정리
- 실행 지시
- 완료/스킵/일정 변경 처리
- 사용자가 직접 알려준 정보와 실제 스케줄 기억

AI가 하지 않는 일:

- 감정 상담
- 심리 분석
- 자기돌봄 코칭
- 의료 조언
- 감정 고백 저장
- 사용자를 길게 설득하는 대화

사용자가 피곤함, 무기력, 하기 싫음 같은 표현을 해도 AI는 상담하지 않는다. 해당 발화는 일정 조정 신호로 처리한다.

예:

```text
"오늘 너무 피곤해" -> 오늘 운동 제외, 취침 앞당김, 범위 축소
"하기 싫어" -> 지금 할지 오늘 제외할지 선택
"집중이 안 돼" -> 작업 시간을 줄이고 지금 시작 여부 확인
```

### 1.2 응답 원칙

- 1~2문장으로 답한다.
- 한 번에 action 하나만 제안한다.
- 답변은 스케줄, 루틴 상태, 다음 행동 중 하나로 연결한다.
- 죄책감을 주지 않는다.
- 상담성 질문으로 이어가지 않는다.
- 실패해도 버튼 fallback으로 처리할 수 있어야 한다.
- 스누즈 기능은 현재 범위에서 제외한다.

---

## 2. 핵심 화면 흐름

### 2.1 홈

홈은 루틴 대시보드가 아니다. 홈은 사용자가 AI 매니저에게 바로 연결되는 전화기다.

구성:

- 흰색 기반
- 우상단 설정 아이콘
- 중앙 매니저 프로필 원형 이미지
- 매니저 이름
- 큰 Call 버튼 하나
- 하단 작은 다음 콜 문구

예:

```text
[설정 아이콘]

      [매니저 프로필 원]
      Manager Name

          [Call]

다음 콜 23:30 · 취침 루틴
```

홈에서 빼는 것:

- 오늘 루틴 전체 리스트
- 완료율
- 통계 그래프
- 체크박스 여러 개
- 복잡한 카드
- AI 채팅창
- 큰 설정 버튼들
- 과한 설명 문구

### 2.2 사용자가 먼저 거는 콜

```text
홈
-> Call 버튼
-> 앱 안 통화 화면
-> AI 매니저와 음성 대화
-> action 처리
-> 로그 저장
```

예:

```text
User:
오늘 뭐 남았어?

AI:
남은 건 과제 40분, 취침 루틴 하나야.
```

### 2.3 예약 콜

v0:

```text
로컬 알림 또는 일반 APNs Push
-> 사용자가 알림 탭
-> 앱 안 수신 화면
-> 받기
-> 앱 안 통화 화면
```

v1:

```text
서버 기반 예약 콜
-> APNs 일반 push
-> call_id 기반 콜 세션 복원
-> LiveKit/WebRTC room 생성
-> 사용자가 앱 안 수신 화면에서 받으면 room join
-> AI agent 음성 세션 연결
```

v2:

```text
서버 예약 job
-> VoIP Push 발송
-> iOS 앱 wake
-> CallKit incoming call report
-> iPhone 시스템 수신 UI 표시
-> 사용자가 받으면 LiveKit/WebRTC room join
-> AI 매니저 음성 세션 연결
```

PushKit은 단순 알림을 전화처럼 보이게 하는 용도가 아니다. 실제 네트워크 기반 live voice call을 시작할 때만 사용한다. VoIP Push를 받은 앱은 CallKit에 빠르게 call을 report해야 한다. iOS 13 SDK 이후에는 report하지 않으면 시스템이 앱을 종료할 수 있고, 반복되면 VoIP Push로 앱을 깨우지 않을 수 있다.

### 2.4 주요 화면

- 홈
- 앱 안 수신 화면
- 통화 화면
- Manager Voice 선택 화면
- 응답 스타일 기록 화면
- 기억 관리 화면
- 스케줄/루틴 추가·수정 화면
- 로그 화면
- 설정 화면

---

## 3. UI 제작 순서

정확한 UI 디자인은 SwiftUI 구현 전에 샘플 이미지로 먼저 잡는다.

작업 순서:

1. 홈, 수신, 통화, Manager Voice 선택, 설정 화면 샘플 이미지 생성
2. 마음에 드는 방향 선택
3. Figma에서 실제 iPhone 프레임으로 정리
4. SwiftUI 구현

Figma에서 먼저 정리할 화면:

- 홈
- 앱 안 수신 화면
- 통화 화면
- Manager Voice 선택 화면
- 설정 화면

홈 샘플 이미지 프롬프트:

```text
흰색 메인, 미니멀한 아이폰 앱 홈 화면.
중앙에 선택된 AI 매니저 프로필 원형 아이콘,
아래에 이름, 큰 Call 버튼 하나,
하단에 다음 예정 콜 "23:30 · 취침 루틴".
우상단 설정 아이콘.
통화 중심이지만 더 깔끔하고 일정 매니저 느낌.
```

---

## 4. 음성 연결 방식

초기 음성 엔진은 Fish Speech / S2 로컬 서버가 아니라 Fish Audio API를 사용한다. Fish Speech / S2 Pro self-hosting은 추후 GPU 서버를 사용할 수 있을 때 실험 항목으로 둔다.

Fish Audio API는 TTS 생성 엔진이다. Fish Audio API만으로도 텍스트를 음성으로 만들 수 있고, `reference_id`로 fish.audio에 있는 voice model을 지정할 수 있다. Fish Audio API를 쓰기 위해 LiveKit/WebRTC가 필수인 것은 아니다.

### 4.1 기본 LiveKit/WebRTC 방식

초기 구현부터 LiveKit/WebRTC를 기본 realtime voice transport로 사용한다. Fish Audio API는 TTS 생성 엔진이고, LiveKit room은 사용자와 AI agent가 실시간 오디오를 주고받는 통화 세션이다. 직접 WebSocket/HTTP 방식은 fallback 또는 단순 prototype 경로로만 둔다.

LiveKit room은 realtime communication 공간이고, participants는 사용자/agent/service, tracks는 audio/video/data stream으로 볼 수 있다. 이 구조가 앱의 전화방 모델에 맞다. LiveKit Agents는 AI 매니저를 realtime participant로 붙이는 구조로 사용한다.

구조:

```text
iPhone App
-> LiveKit/WebRTC room join
-> user audio track publish
-> AI agent participant
-> STT streaming
-> LLM intent/action
-> Fish Audio API TTS
-> agent audio track publish
-> iPhone App에서 AI 음성 수신
```

필요 API:

```http
POST /realtime/rooms
POST /realtime/token
POST /realtime/agent-dispatch
POST /realtime/end-room
```

장점:

- 실시간 오디오 송수신 구조가 명확하다.
- iPhone 앱과 AI agent가 같은 room에 participant로 들어갈 수 있다.
- 마이크 입력과 AI 음성 출력을 media track으로 관리할 수 있다.
- CallKit 수신 후 사용자가 받으면 room join으로 연결하기 쉽다.
- WebRTC 기반이라 실시간 통화 구조에 맞다.

주의점:

- LiveKit room, token, agent dispatch 구조가 필요하다.
- Fish Audio API TTS 결과를 LiveKit agent audio track으로 보내는 bridge 코드가 필요하다.
- 단순 HTTP 방식보다 초기 구조가 무거울 수 있다.

### 4.2 직접 WebSocket/HTTP fallback 방식

직접 WebSocket/HTTP 방식은 fallback 또는 단순 prototype으로 둔다. 이 방식은 LiveKit 없이 Fish Audio API TTS와 iPhone 오디오 재생만 빠르게 검증할 때 사용한다.

구조:

```text
iPhone App
-> WebSocket 또는 HTTP streaming
-> Backend realtime voice session
-> STT streaming
-> LLM intent/action
-> Fish Audio API TTS
-> audio response
-> iPhone App 재생
```

LiveKit/WebRTC는 Fish Audio API를 쓰기 위한 필수 조건은 아니다. 다만 이 앱의 기본 통화 세션은 LiveKit/WebRTC로 설계한다.

---

## 5. Fish Audio API TTS

iPhone 앱은 Fish Audio API를 직접 호출하지 않는다. 백엔드가 Fish Audio API에 TTS 요청을 보내고, 생성된 오디오를 앱에 전달한다.

`assistant_profiles.voice_id`는 Fish Audio의 `reference_id`로 사용한다.

`POST /voice/tts` 요청 예시:

```json
{
  "assistant_id": "uuid",
  "call_id": "uuid",
  "text": "[short pause] 지금 과제 시작 시간이야. 20분만 진행할게.",
  "stream": false
}
```

처리 흐름:

1. `selected_assistant_id` 조회
2. `assistant_profiles`에서 `voice_id` 조회
3. `voice_id`를 Fish Audio `reference_id`로 사용
4. Fish Audio API에 text + reference_id 전달
5. 생성된 audio 수신
6. iPhone 앱으로 audio 전달
7. `provider_usage_logs`에 latency와 사용량 기록
8. 자주 쓰는 `tagged_text`는 `tts_cache`에 저장

---

## 6. Voice Line Template + Tag Variation

대사는 약 100개의 base voice line template을 준비한다. 각 콜 상황에서 intent와 schedule context에 맞는 base line을 하나 선택하고, 선택된 base line에는 매번 delivery tag를 다르게 삽입한다.

delivery tag는 Fish S2 bracket syntax를 사용한다.

사용 후보:

- `[short pause]`
- `[pause]`
- `[low voice]`
- `[emphasis]`
- `[inhale]`
- `[exhale]`
- `[calm and direct]`
- `[slightly faster]`
- `[firm but not harsh]`
- `[quiet professional tone]`

규칙:

- 한 문장에 태그는 보통 1~3개만 사용한다.
- 태그는 문장 앞에만 붙이지 않고 필요한 단어 앞이나 문장 사이에 넣는다.
- 같은 base line이라도 매번 다른 tag pattern을 사용할 수 있다.
- 같은 tag pattern이 연속 재생되지 않게 한다.
- 감정 연기 태그보다 pause, emphasis, tone, pace 계열을 우선 사용한다.
- 생성된 `tagged_text`는 TTS cache에 저장한다.
- 품질이 나쁜 생성 결과는 재사용하지 않는다.

예:

```text
base_text:
지금 과제 시작 시간이야. 20분만 진행할게.

tagged_text 후보:
[quiet professional tone] 지금 과제 시작 시간이야. [short pause] 20분만 진행할게.
지금은 [emphasis] 과제 시작 시간이야. [pause] 20분만 진행할게.
[inhale] 지금 과제 시작 시간이야. [calm and direct] 20분만 진행할게.
[low voice] 지금 과제 시작 시간이야. [short pause] 먼저 20분만.
```

---

## 7. 기본 매니저

기본 매니저는 3명으로 한다. 앱에 기본 `assistant_profiles` 3개를 seed data로 넣는다.

사용자는 설정에서 3명 중 하나를 선택한다. 선택된 매니저는 홈 중앙에 표시된다.

아직 정하지 않는 항목:

- 매니저 이름
- 프로필 이미지
- Fish Audio reference_id
- 캐릭터 설명
- 기본 선택값

문서의 `Manager A/B/C`는 개발용 임시 식별자다. 실제 이름, 이미지, voice model, 기본 선택값은 나중에 확정한다.

---

## 8. 응답 스타일 설정

설정에서 ChatGPT처럼 사용자가 직접 말하는 방식이나 성격 지침을 입력할 수 있게 한다.

구조:

```text
Settings
-> Manager Personality / Response Style
-> 자유 입력
-> 저장
-> AI 응답 생성 시 system/developer instruction 아래의 사용자 선호 지침으로 참고
```

이 설정은 표현 방식과 응답 습관에만 영향을 준다. 앱의 기본 역할은 개인 일정 매니저로 유지한다. 상담, 감정 분석, 의료 조언 쪽으로 역할이 바뀌면 안 된다.

---

## 9. 기억 기능

기억할 것은 사용자에 대한 정보와 실제 스케줄이다.

저장할 것:

- 사용자가 직접 알려준 개인 정보
- 사용자가 직접 기억하라고 한 정보
- 사용자의 고정 일정
- 반복 일정
- 중요한 마감
- 약속
- 수업
- 업무 시간
- 과제
- 시험
- 취침/기상 목표
- 운동/공부/개인 일정
- 매니저가 일정 관리에 써야 하는 정보

저장하지 않을 것:

- 자주 미루는 루틴 자동 분석
- 선호 시간대 자동 추론
- 스누즈 패턴 분석
- 감정 고백
- 상담성 대화
- 민감한 심리 상태

새 기억 후보가 생겼을 때 바로 저장하지 않고 사용자 확인을 받는다.

처리 흐름:

1. 대화 중 새 기억 후보 발생
2. `memory_confirmation_requests`에 `pending`으로 저장
3. AI가 사용자에게 저장 여부 확인
4. 사용자가 동의하면 `user_profile_memories` 또는 `user_schedule_items`에 저장
5. 사용자가 거절하면 `rejected` 처리

예:

```text
User:
나는 월수금 오전에 수업 있어.

AI:
월수금 오전 수업을 기억해둘까?
```

---

## 10. 데이터 모델

### 10.1 assistant_profiles

```sql
create table assistant_profiles (
  id uuid primary key,
  name text not null,
  description text,
  voice_provider text not null default 'fish_audio_api',
  voice_id text not null,
  avatar_url text,
  is_default boolean default false,
  created_at timestamptz default now()
);
```

Seed data 예시:

```sql
insert into assistant_profiles (
  id,
  name,
  description,
  voice_provider,
  voice_id,
  avatar_url,
  is_default
) values
(
  gen_random_uuid(),
  'Manager A',
  '기본 매니저 1',
  'fish_audio_api',
  'FISH_AUDIO_REFERENCE_ID_1',
  null,
  true
),
(
  gen_random_uuid(),
  'Manager B',
  '기본 매니저 2',
  'fish_audio_api',
  'FISH_AUDIO_REFERENCE_ID_2',
  null,
  false
),
(
  gen_random_uuid(),
  'Manager C',
  '기본 매니저 3',
  'fish_audio_api',
  'FISH_AUDIO_REFERENCE_ID_3',
  null,
  false
);
```

### 10.2 users

```sql
create table users (
  id uuid primary key,
  email text,
  display_name text,
  timezone text not null default 'Asia/Seoul',
  selected_assistant_id uuid references assistant_profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### 10.3 user_devices

VoIP Push와 일반 APNs Push를 위해 사용자 기기 정보를 저장한다.

```sql
create table user_devices (
  id uuid primary key,
  user_id uuid not null references users(id),
  platform text not null default 'ios',
  device_id text,
  apns_push_token text,
  voip_push_token text,
  app_version text,
  environment text not null default 'sandbox',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

필드 설명:

- `apns_push_token`: 일반 push 알림용 token
- `voip_push_token`: PushKit VoIP push용 token
- `environment`: sandbox / production 구분
- `device_id`: 같은 사용자의 여러 기기 구분
- `active`: 로그아웃, 앱 삭제, token 만료 처리용

### 10.4 user_response_style_settings

```sql
create table user_response_style_settings (
  user_id uuid primary key references users(id),
  response_style_instructions text,
  example_phrases text[],
  enabled boolean not null default true,
  updated_at timestamptz default now()
);
```

### 10.5 user_profile_memories

```sql
create table user_profile_memories (
  id uuid primary key,
  user_id uuid not null references users(id),
  memory_key text not null,
  memory_value jsonb not null,
  source text,
  confirmed_by_user boolean not null default true,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### 10.6 user_schedule_items

`user_schedule_items`는 스케줄과 루틴을 함께 다루는 중심 테이블이다.

```sql
create table user_schedule_items (
  id uuid primary key,
  user_id uuid not null references users(id),
  title text not null,
  item_type text not null,
  starts_at timestamptz,
  ends_at timestamptz,
  recurrence_rule text,
  importance int default 3,
  reminder_enabled boolean not null default true,
  expected_duration_minutes int,
  enabled boolean not null default true,
  source text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

필드 설명:

- `reminder_enabled`: 이 일정에 알림/콜을 보낼지 여부
- `expected_duration_minutes`: 예상 소요 시간
- `enabled`: 반복 일정이나 루틴을 꺼둘 수 있는 상태값

item_type 예시:

- class
- work
- assignment
- exam
- meeting
- exercise
- sleep
- routine
- personal

### 10.7 memory_confirmation_requests

```sql
create table memory_confirmation_requests (
  id uuid primary key,
  user_id uuid not null references users(id),
  proposed_memory_key text not null,
  proposed_memory_value jsonb not null,
  prompt text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);
```

status 후보:

- pending
- accepted
- rejected
- expired

### 10.8 call_sessions

`call_sessions.status` 하나에 전화 연결 상태와 일정 처리 결과를 같이 넣지 않는다. 전화 상태와 결과 action을 분리한다.

```sql
create table call_sessions (
  id uuid primary key,
  user_id uuid not null references users(id),
  schedule_item_id uuid references user_schedule_items(id),
  call_type text not null default 'manual_manager',
  call_status text not null default 'scheduled',
  result_action text not null default 'none',
  scheduled_at timestamptz,
  ringing_started_at timestamptz,
  answered_at timestamptz,
  ended_at timestamptz,
  missed_at timestamptz,
  created_at timestamptz not null default now()
);
```

기존 `status` 컬럼은 제거하거나, 마이그레이션 완료 전까지 임시 호환용으로만 둔다.

call_status 후보:

- scheduled
- ringing
- accepted
- declined
- missed
- ended
- failed

result_action 후보:

- none
- completed
- skipped
- rescheduled
- reduced_scope
- canceled_today
- updated_schedule
- prioritized

예:

```text
call_status = ended
result_action = completed

call_status = declined
result_action = none

call_status = ended
result_action = updated_schedule
```

### 10.9 conversation_turns

```sql
create table conversation_turns (
  id uuid primary key,
  user_id uuid not null references users(id),
  call_id uuid not null references call_sessions(id),
  role text not null,
  text text,
  intent text,
  confidence numeric,
  interrupted boolean not null default false,
  audio_started_at timestamptz,
  audio_interrupted_at timestamptz,
  audio_completed_at timestamptz,
  created_at timestamptz not null default now()
);
```

### 10.10 provider_usage_logs

```sql
create table provider_usage_logs (
  id uuid primary key,
  user_id uuid references users(id),
  call_id uuid references call_sessions(id),
  provider text not null,
  service text not null,
  model text,
  input_units numeric,
  output_units numeric,
  text_bytes int,
  estimated_cost_usd numeric,
  latency_ms int,
  created_at timestamptz not null default now()
);
```

### 10.11 voice_line_templates

```sql
create table voice_line_templates (
  id uuid primary key,
  intent text not null,
  situation text,
  base_text text not null,
  variables jsonb,
  enabled boolean not null default true,
  created_at timestamptz not null default now()
);
```

### 10.12 voice_line_renders

```sql
create table voice_line_renders (
  id uuid primary key,
  template_id uuid not null references voice_line_templates(id),
  assistant_id uuid references assistant_profiles(id),
  tagged_text text not null,
  delivery_tags text[],
  quality_score int,
  play_count int not null default 0,
  last_played_at timestamptz,
  created_at timestamptz not null default now()
);
```

### 10.13 tts_cache

Fish Audio API는 TTS 입력 텍스트의 UTF-8 byte 기준으로 과금되므로, 자주 쓰는 문장은 재생성하지 않고 캐시를 사용한다.

```sql
create table tts_cache (
  id uuid primary key,
  provider text not null,
  model text,
  assistant_id uuid references assistant_profiles(id),
  voice_id text,
  text_hash text not null,
  text text not null,
  audio_url text,
  created_at timestamptz not null default now(),
  unique(provider, model, assistant_id, voice_id, text_hash)
);
```

처리 흐름:

1. TTS 요청 전 `tagged_text` 기준으로 `text_hash` 생성
2. provider + model + assistant_id + voice_id + text_hash로 cache 조회
3. 있으면 cached audio 사용
4. 없으면 Fish Audio API로 생성
5. 생성 결과 저장

---

## 11. API

### 11.1 콜

```http
POST /call-sessions
GET /call-sessions/:id
POST /call-sessions/:id/join
POST /call-sessions/:id/answer
POST /call-sessions/:id/decline
POST /call-sessions/:id/end
POST /call-sessions/:id/skip
POST /call-sessions/:id/complete
POST /call-sessions/:id/reschedule
POST /call-sessions/:id/reduce-scope
POST /call-sessions/:id/cancel-today
POST /call-sessions/:id/prioritize
```

### 11.2 음성

```http
POST /voice/stt/stream
POST /voice/intent
POST /voice/tts
POST /voice/respond
```

`/voice/*`는 STT, intent, TTS, 응답 생성만 담당한다.

### 11.3 매니저와 응답 스타일

```http
GET /assistant-profiles
PATCH /users/me/selected-assistant
GET /response-style-settings
PATCH /response-style-settings
```

### 11.4 기억과 스케줄

```http
GET /profile-memories
POST /profile-memories
PATCH /profile-memories/:id
DELETE /profile-memories/:id
GET /memory-confirmations
POST /memory-confirmations
POST /memory-confirmations/:id/accept
POST /memory-confirmations/:id/reject
GET /schedule-items
POST /schedule-items
PATCH /schedule-items/:id
DELETE /schedule-items/:id
```

### 11.5 기기와 Push

```http
POST /devices/apns-token
POST /voip/token
POST /call-sessions/:id/voip-push
```

### 11.6 Realtime

```http
POST /realtime/rooms
POST /realtime/token
POST /realtime/agent-dispatch
POST /realtime/rooms/:id/interrupt
POST /realtime/end-room
```

`/realtime/*`는 LiveKit room 생성, token 발급, agent dispatch, barge-in interrupt, room 종료를 담당한다.

---

## 12. Barge-in 처리

사용자가 말하기 시작하면 AI 음성을 즉시 중단한다.

처리 흐름:

1. AI 음성 재생 시작
2. `audio_started_at` 기록
3. VAD가 사용자 음성 시작 감지
4. iPhone 앱이 현재 AI audio playback 중단
5. `/realtime/rooms/:id/interrupt` 호출
6. `interrupted = true`
7. `audio_interrupted_at` 기록
8. 사용자 발화 STT를 우선 처리

---

## 13. CallKit + PushKit 구현 체크리스트

Apple Developer:

- Apple Developer Program 가입
- Bundle ID 생성
- Push Notifications capability 활성화
- Background Modes 활성화
- Voice over IP 체크
- APNs Auth Key 생성
- Key ID 확인
- Team ID 확인
- Bundle ID 확인
- `.p8` key를 서버에 안전하게 저장

iOS App:

- PushKit 등록
- VoIP push token 발급
- VoIP push token 서버 업로드
- VoIP push payload 수신
- CallKit provider 설정
- `reportNewIncomingCall` 호출
- 사용자가 받으면 LiveKit/WebRTC room join
- 거절/부재중/종료 상태 서버 반영

Server:

- 예약 job 실행
- call session 생성
- LiveKit/WebRTC room 생성
- VoIP push 발송
- call timeout 처리
- duplicate call 방지
- answered / declined / missed / ended 상태 관리

---

## 14. iOS Audio Session

통화 화면에서는 녹음과 재생을 동시에 처리해야 한다.

필요한 처리:

- AVAudioSession category 설정
- 마이크 입력
- AI 음성 재생
- 스피커 출력
- 블루투스 이어폰
- 이어폰/스피커 route change
- 전화/알람 등 system interruption
- background/foreground 전환
- CallKit 수신 후 audio session activation

통화 시작 시:

```text
AVAudioSession category = playAndRecord
mode = voiceChat 또는 videoChat 검토
options = defaultToSpeaker, allowBluetooth
```

CallKit 사용 시:

```text
CXProviderDelegate에서 provider가 audio session을 activate했을 때
마이크 입력과 오디오 재생을 시작한다.
```

---

## 15. 보안과 RLS

### 15.1 Supabase RLS

모든 user_id 기반 테이블에 Row Level Security를 적용한다.

```sql
alter table user_devices enable row level security;
alter table user_profile_memories enable row level security;
alter table user_schedule_items enable row level security;
alter table call_sessions enable row level security;
alter table conversation_turns enable row level security;
alter table provider_usage_logs enable row level security;
alter table memory_confirmation_requests enable row level security;
alter table tts_cache enable row level security;
alter table voice_line_templates enable row level security;
alter table voice_line_renders enable row level security;
```

기본 원칙:

- 사용자는 자신의 `user_id`에 해당하는 row만 읽고 쓸 수 있다.
- 서버 service role은 예약 job, push 발송, 음성 처리에 필요한 작업만 수행한다.
- `voice_line_templates`처럼 공용 템플릿 성격의 테이블은 public read / admin write 정책으로 분리할 수 있다.

### 15.2 API Key 보안

앱 안에 secret key를 넣지 않는다.

앱에 넣지 않을 것:

- APNs `.p8` key
- APNs Key ID / Team ID 조합을 이용한 서버 인증 로직
- Fish Audio API key
- STT provider key
- LLM provider key
- Supabase service role key

모든 secret은 backend 환경변수로 관리한다. iPhone 앱은 백엔드 API만 호출한다.

### 15.3 APNs 환경 구분

APNs는 sandbox와 production 환경을 구분한다. `user_devices.environment`에 현재 token 환경을 저장한다.

서버는 환경에 맞는 APNs endpoint로 push를 보낸다.

---

## 16. 실패 Fallback

실패해도 사용자는 버튼으로 action을 처리할 수 있어야 한다.

처리할 실패 케이스:

- 마이크 권한 없음
- 알림 권한 없음
- 네트워크 끊김
- STT timeout
- STT streaming 실패
- Fish Audio API 응답 지연
- TTS 생성 실패
- LLM intent/action 실패
- JSON parse 실패
- call_session 없음
- VoIP Push는 왔는데 서버 call_id 조회 실패
- 사용자가 받았는데 음성 세션 연결 실패
- CallKit report 실패
- 앱 background/foreground 전환 중 세션 손실

fallback UI:

```text
[완료] [스킵] [오늘 일정 보기] [끊기]
```

스누즈는 현재 범위에서 제외한다.

---

## 17. 테스트 기준

기기 / Push:

- APNs 일반 push token 저장
- VoIP push token 저장
- sandbox / production token 구분
- 같은 사용자의 여러 기기 처리
- 비활성 device token 처리

CallKit:

- VoIP Push 수신 후 `reportNewIncomingCall` 호출
- 사용자가 받기
- 사용자가 거절
- 사용자가 받지 않음
- CallKit 수신 후 audio session activation
- CallKit 종료 후 서버 상태 업데이트

Realtime voice:

- LiveKit/WebRTC room join 테스트
- AI agent participant 연결 테스트
- user audio track publish 테스트
- agent audio track playback 테스트
- 직접 WebSocket/HTTP fallback 테스트
- iPhone 앱에서 audio 재생
- 사용자가 말할 때 AI 음성 중단
- Fish Audio API 첫 오디오 도착 시간 측정
- 한국어 짧은 문장 품질
- reference_id별 매니저 음색 분리
- tag variation별 자연스러움 확인

AI:

- "오늘은 스킵" -> skipped
- "오늘 뭐 남았어?" -> 남은 일정 답변
- "집중이 안 돼" -> 범위 축소
- "뭐부터 해야 돼?" -> 우선순위 정리
- 감정 표현을 상담이 아니라 스케줄 action으로 처리

기억:

- 사용자가 직접 준 정보 저장
- 저장 확인 후 기억 저장
- 자동 패턴 분석 저장 금지
- 감정 고백/상담성 대화 저장 금지
- 기억 수정/삭제

보안:

- 앱 번들에 secret key가 포함되지 않았는지 확인
- RLS로 다른 user_id 데이터 접근 차단
- 서버 service role key가 클라이언트에 노출되지 않았는지 확인

실패:

- STT 실패 시 버튼 처리
- TTS 실패 시 텍스트/버튼 처리
- 음성 세션 연결 실패 시 앱 안 fallback 화면 표시
- call_session 중복 생성 방지
- CallKit report 실패 시 서버에 failed 상태 기록

---

## 18. 근거

- Fish Audio TTS는 `reference_id`로 voice model을 지정할 수 있고, `s2-pro` 모델을 권장한다.
- Fish Audio는 HTTP streaming과 WebSocket streaming을 지원하며, WebSocket 방식은 LLM token이 점진적으로 도착하는 상황에 맞다.
- Fish Audio API 가격은 2026-06-23 확인 기준 `s2-pro`가 `$15 / 1M UTF-8 bytes`다.
- LiveKit은 room, participants, tracks 구조로 실시간 오디오를 다루고, Agents는 realtime media/data를 처리하는 participant로 붙을 수 있다.
- PushKit VoIP는 live voice call 시작용이며, VoIP push를 받은 뒤 CallKit에 빠르게 report해야 한다.

참고 링크:

- https://docs.fish.audio/api-reference/endpoint/openapi-v1/text-to-speech
- https://docs.fish.audio/features/realtime-streaming
- https://docs.fish.audio/developer-guide/models-pricing/pricing-and-rate-limits
- https://docs.livekit.io/intro/basics/rooms-participants-tracks/
- https://docs.livekit.io/agents/
- https://developer.apple.com/documentation/pushkit/responding-to-voip-notifications-from-pushkit
