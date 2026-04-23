# Senior SDE AI 应用工程师转型 12 周冲刺计划 (v2.0)

## 0. 核心转型哲学
- **不造轮子：** 专注于大模型的工程化落地，而非底层算法研发。
- **工程至上：** 用 6 年资深工程经验（Java/React/Infra）去围剿 AI 的“不确定性”。
- **闭环思维：** 每一个阶段的学习都必须落实到一个可运行的代码 Demo 或项目模块中。

---

## 第一阶段：Python 现代后端与异步架构 (Week 1-2)
**目标：** 将思维从 Java/TS 切换到 Python 高并发异步体系，搭建 AI 后端的“骨架”。

### 1. 核心学习要点
- **Python 3.12+：** `asyncio` (协程)、`ContextVars` (请求上下文)、`Type Hints` (类型标注)。
- **FastAPI：** 依赖注入 (DI)、中间件、Background Tasks、SSE (流式输出)。
- **Pydantic V2：** 严格的 Schema 校验与数据转换。

### 2. 学习资源
- [FastAPI 官方文档](https://fastapi.tiangolo.com/): 重点看 Dependencies 和 Async 部分。
- [Real Python: Async IO Guide](https://realpython.com/async-io-python/): 深入理解 Python 异步。
- [Pydantic V2 Docs](https://docs.pydantic.dev/latest/): 学习如何将非结构化 AI 输出转为结构化数据。

### 3. 实战要求
- 编写一个支持 **SSE (Server-Sent Events)** 的流式 API。
- 实现一个多租户**令牌桶限流算法 (Rate Limiting)**。

---

## 第二阶段：LLM 编排、Agent 与逻辑控制 (Week 3-5)
**目标：** 掌握“Prompt 为逻辑，代码为控制”的范式，构建有复杂状态的 AI 代理。

### 1. 核心学习要点
- **LangGraph (核心)：** 学习如何构建有环图 (Cycles)，处理 Agent 的“思考-行动-观察”闭环。
- **Function Calling：** 定义 JSON Schema 让 LLM 精准调用你的外部 API (Java/Python 接口)。
- **Token 管理：** 学习 Tiktoken 计数、上下文窗口裁剪与总结策略。

### 2. 学习资源
- [DeepLearning.ai: AI Agents with LangGraph](https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/): 吴恩达必修课。
- [OpenAI Cookbook](https://cookbook.openai.com/): 重点看 Function Calling 案例。
- [LangChain Blog: Why LangGraph?](https://blog.langchain.dev/langgraph/): 理解状态管理的重要性。

### 3. 实战要求
- 构建一个 **Multi-Agent 协作系统** (如：需求分析 Agent + 代码生成 Agent + 自动化测试 Agent)。
- 实现 Agent 的**自我修复 (Self-healing)**：当 AI 返回格式错误时，自动捕获并发送回 AI 修正。

---

## 第三阶段：RAG 与向量数据工程 (Week 6-8)
**目标：** 解决模型幻觉，让 AI 拥有企业私有知识库。

### 1. 核心学习要点
- **Embedding & Vector DB：** Milvus / Pinecone 的索引机制 (HNSW, IVF)。
- **高级 RAG 技巧：** Hybrid Search (混合检索)、Re-ranking (重排序)、Query Expansion (查询扩展)。
- **数据切分 (Chunking)：** 语义切分 (Semantic Chunking) vs 递归长度切分。

### 2. 学习资源
- [Pinecone Learning Center](https://www.pinecone.io/learn/): 向量数据库百科全书。
- [LlamaIndex Docs](https://docs.llamaindex.ai/): 学习复杂数据结构的 AI 索引。
- [Ragas Framework](https://docs.ragas.io/): 学习如何量化评估 RAG 的精度。

### 3. 实战要求
- 搭建端到端的**私有文档问答系统** (支持 PDF, GitHub Repo)。
- 使用 Ragas 对检索精度进行压测，并产出对比优化报表。

---

## 第四阶段：AI 基建 (MLOps) 与云部署 (Week 9-10)
**目标：** 弥补 Infra 短板，把 AI 应用变成可弹性伸缩的工业级服务。

### 1. 核心学习要点
- **Terraform for AI：** 模块化部署 AWS Lambda, ECS, 和 Vector DB。
- **Model Serving：** 使用 **Ollama** 或 **vLLM** 部署本地大模型，并实现 Model Fallback。
- **可观测性：** 接入 **LangSmith** 追踪 Prompt 版本和 LLM 思考链。

### 2. 学习资源
- [BentoML Docs](https://docs.bentoml.com/): 学习高性能模型打包。
- [AWS Bedrock Practical Guide](https://aws.amazon.com/bedrock/): 学习 Serverless AI 架构。
- [LangSmith Guide](https://docs.smith.langchain.com/): 学习 AI 应用的调试与追踪。

### 3. 实战要求
- 编写 Terraform 脚本，实现一套包含**热/备模型切换逻辑**的云端环境。
- 实现 AI 应用的成本监控 Dashboard (基于 Token 消耗)。

---

## 第五阶段：Generative UI 与最终交付 (Week 11-12)
**目标：** 发挥 React/TS 优势，打造顶级的 AI 交互体验与作品集。

### 1. 核心学习要点
- **Vercel AI SDK：** `useChat`, `useCompletion` Hooks。
- **Generative UI：** 学习如何让 AI 动态触发 React 组件的渲染 (Artifacts)。
- **前端流式渲染优化：** 骨架屏、乐观 UI 更新。

### 2. 学习资源
- [Vercel AI SDK Docs](https://sdk.vercel.ai/docs): 前端 AI 集成的行业标准。
- [Shadcn/ui Components](https://ui.shadcn.com/): 快速搭建高质量 AI 界面。

---

## 终极作品集 (Portfolio) 项目设计

### 项目 1：Agentic SRE 运维助手 (AI SRE Commander)
- **展示点：** 后端逻辑 + AI 控制流 + 基础设施集成。
- **功能：** 自然语言诊断 K8s 集群问题，分析日志，生成并执行修复建议。
- **技术：** LangGraph + FastAPI + Boto3 + Terraform + React。

### 项目 2：Multi-Modal Market Oracle (实时多模态情报预言家)
- **展示点：** 大数据流处理 + 向量检索。
- **功能：** 实时处理 YouTube 直播和金融推特流，通过 Kafka 转向量，提供实时趋势问答。
- **技术：** Kafka + Milvus + OpenAI Whisper + LlamaIndex + React。

### 项目 3：Generative Feature Governance (动态功能灰度引擎)
- **展示点：** 传统 Java 企业架构集成 AI。
- **功能：** AI 根据用户实时反馈动态调整 Java 后端的 Feature Flag，前端配合生成个性化 UI。
- **技术：** Spring Boot + gRPC + Python AI Service + Vercel AI SDK。

---

## 学习建议与薪资参考
- **时间投入：** 每周 15-20 小时 (工作日 2h/天，周末 5h/天)。
- **薪资预期：** - 温哥华本地: $160k - $190k CAD (Base)
    - 北美远程 (US): $180k - $230k USD (Base)
- **核心竞争力：** 你的护城河不是写代码，而是**用 6 年沉淀的架构能力去驯服 AI 的随机性**。
