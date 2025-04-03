# Action Matrix
[서비스 링크](https://action-matrix.vercel.app/)
## 기획
### 참고영상
[Adora Cheung - How to Prioritize Your Time](https://www.youtube.com/watch?v=XcCmMOWuAF4&t=0s)
### 디자인
[Figma 디자인 링크](https://www.figma.com/design/3AhV4Dnie3x8aVtlsdGp4s/Action-Matrix?t=DggEikbUwZfU0DXF-0)
## 개발
### 기능
#### 할 일 등록
- 할 일의 제목, 내용, 우선순위 설정
- 난이도 선택과 분할을 선택
- 난이도 선택 시 난이도 부여 후 할 일 저장
- 분할 선택 시 여러 개의 subtask로 나누고 난이도 부여 후 저장
#### filter
- default는 가장 최신 task가 가장 위에 위치
- 우선순위와 난이도 tag 사용하여 filter
#### Demo와 소셜 로그인 버전 분리
- Demo 버전 사용 시 데이터를 Local Storage에 저장
- 소셜 로그인 사용 시 supabase로 구축한 서버에 데이터 저장.

