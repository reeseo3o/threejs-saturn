# Three.js로 구현한 토성 3D 시각화

이 프로젝트는 Three.js와 TypeScript를 사용하여 구현한 토성의 3D 시각화입니다. 토성의 구체와 특징적인 고리들을 상세하게 표현하였으며, 사용자가 마우스로 자유롭게 시점을 조작할 수 있습니다.

## 주요 기능
- 토성의3D 렌더링
- 다중 레이어로 구성된 토성의 고리 시스템
- 사용자 인터랙션이 가능한 오비트 컨트롤
- 반응형 디자인
- 자연스러운 회전 애니메이션

## 기술 스택
- Three.js
- TypeScript
- Vite
- HTML5 Canvas

## 설치 방법
1. 저장소를 클론합니다:
```bash
git clone [repository-url]
```

2. 의존성을 설치합니다:
```bash
npm install or yarn 
```

3. 개발 서버를 실행합니다:
```bash
npm run dev or yarn dev
```

## 프로젝트 구조
- `src/main.ts`: 메인 애플리케이션 로직
- `src/style.css`: 스타일시트
- `index.html`: HTML 진입점

## 주요 구현 사항
### 토성 본체
- 사실적인 텍스처 매핑
- 물리적 기반 렌더링 (PBR) 적용
- 자연스러운 회전 효과

### 토성의 고리
- 5개의 개별 고리 레이어
- 투명도와 색상 그라데이션
- 실제 토성의 고리와 유사한 기울기 적용

### 조명 시스템
- 주 광원
- 보조 광원
- 배경 광원
- 후면 광원