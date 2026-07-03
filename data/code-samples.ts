export type CodeTab = {
  label: string;
  filename: string;
  code: string;
};

// Representative patterns only — illustrative, not extracted from production source.
export const codeSamples: Record<string, CodeTab[]> = {
  cbsai: [
    {
      label: "Frontend",
      filename: "WorkspaceSwitcher.tsx",
      code: `function WorkspaceSwitcher({ workspaces, active }: Props) {
  const { setWorkspace } = useWorkspace();

  return (
    <Select value={active.id} onValueChange={setWorkspace}>
      {workspaces.map((ws) => (
        <SelectItem key={ws.id} value={ws.id}>
          {ws.name}
        </SelectItem>
      ))}
    </Select>
  );
}`,
    },
    {
      label: "Backend",
      filename: "requirePermission.ts",
      code: `export function requirePermission(action: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { workspaceId, role } = await getSession(req);
    const allowed = await rbac.can(role, action, workspaceId);

    if (!allowed) return res.status(403).json({ error: "Forbidden" });
    next();
  };
}`,
    },
    {
      label: "AI Layer",
      filename: "ocrPipeline.ts",
      code: `export async function extractInvoiceFields(document: Buffer) {
  const text = await ocr.recognize(document);
  const draft = await llm.extract(text, invoiceSchema);

  // Never auto-post — a human confirms low-confidence fields first.
  return draft.confidence > 0.9 ? draft : flagForReview(draft);
}`,
    },
  ],
  artemis: [
    {
      label: "Frontend",
      filename: "VoiceSession.tsx",
      code: `function VoiceSession() {
  const { transcript, isListening, start, stop } = useVoiceSession();

  return (
    <button onClick={isListening ? stop : start}>
      {isListening ? "Listening…" : "Ask Artemis"}
      <Waveform active={isListening} transcript={transcript} />
    </button>
  );
}`,
    },
    {
      label: "Backend",
      filename: "orchestrator.ts",
      code: `export async function answer(query: string, ctx: WorkspaceContext) {
  const plan = await reasoner.decompose(query);
  const results = await Promise.all(
    plan.steps.map((step) => callModule(step, ctx))
  );

  return reasoner.synthesize(query, results);
}`,
    },
    {
      label: "AI Layer",
      filename: "grounding.ts",
      code: `async function grounded(answer: Draft, sources: Record[]) {
  // Every figure in the answer must trace back to a real record.
  const unverified = answer.claims.filter((c) => !matchesSource(c, sources));

  if (unverified.length) throw new UngroundedAnswerError(unverified);
  return answer;
}`,
    },
  ],
  "finance-platform": [
    {
      label: "Frontend",
      filename: "KpiTile.tsx",
      code: `function KpiTile({ metric }: { metric: Kpi }) {
  const isGood = metric.delta >= 0 === metric.goodDirection === "up";

  return (
    <Card>
      <p className="label">{metric.label}</p>
      <p className="value">{formatCurrency(metric.value)}</p>
      <Delta value={metric.delta} positive={isGood} />
    </Card>
  );
}`,
    },
    {
      label: "Backend",
      filename: "kpiEngine.ts",
      code: `export function computeKpi(name: string, period: Period) {
  const definition = kpiRegistry.get(name);
  if (!definition) throw new UnknownKpiError(name);

  // One definition, consumed by every dashboard and export.
  return definition.evaluate(period);
}`,
    },
    {
      label: "AI Layer",
      filename: "documentIngest.ts",
      code: `export async function ingest(file: UploadedFile) {
  const parsed = await ocr.parse(file);
  const confidence = parsed.fields.every((f) => f.confidence > 0.85);

  return confidence ? autoPost(parsed) : queueForReview(parsed);
}`,
    },
  ],
  "crm-platform": [
    {
      label: "Frontend",
      filename: "PipelineBoard.tsx",
      code: `function PipelineBoard({ stages }: { stages: Stage[] }) {
  return (
    <DragDropContext onDragEnd={moveDeal}>
      {stages.map((stage) => (
        <StageColumn key={stage.id} stage={stage} deals={stage.deals} />
      ))}
    </DragDropContext>
  );
}`,
    },
    {
      label: "Backend",
      filename: "dispatch.ts",
      code: `export function scheduleWorkOrder(order: WorkOrder) {
  const candidates = techs.filter((t) =>
    t.hasSkill(order.skill) && t.isAvailable(order.window)
  );

  return candidates.sort(byDistanceTo(order.site))[0];
}`,
    },
    {
      label: "AI Layer",
      filename: "salesAssistant.ts",
      code: `export async function draftFollowUp(deal: Deal) {
  const suggestion = await llm.draft(deal.history);

  // Suggestion only — a rep must approve before it sends.
  return { suggestion, requiresApproval: true };
}`,
    },
  ],
  "hr-payroll": [
    {
      label: "Frontend",
      filename: "ApprovalStep.tsx",
      code: `function ApprovalStep({ request }: { request: LeaveRequest }) {
  const { approve, deny } = useApprovalActions(request.id);

  return (
    <Card>
      <RequestSummary request={request} />
      <Button onClick={approve}>Approve</Button>
      <Button variant="ghost" onClick={deny}>Deny</Button>
    </Card>
  );
}`,
    },
    {
      label: "Backend",
      filename: "auditLog.ts",
      code: `export function withAudit<T>(action: string, fn: () => Promise<T>) {
  return async (actor: User, ...args: unknown[]) => {
    const result = await fn.apply(null, args);
    await audit.record({ actor, action, timestamp: Date.now() });
    return result;
  };
}`,
    },
    {
      label: "AI Layer",
      filename: "hrAssistant.ts",
      code: `export async function answerHrQuestion(question: string, employeeId: string) {
  // Scoped strictly narrower than a human HR admin's access.
  const context = await hrData.scopedTo(employeeId);
  return llm.answer(question, context);
}`,
    },
  ],
  "vendor-inventory": [
    {
      label: "Frontend",
      filename: "RiskScorecard.tsx",
      code: `function RiskScorecard({ vendor }: { vendor: Vendor }) {
  const score = useVendorRiskScore(vendor.id);

  return (
    <Card>
      <ScoreRing value={score.value} band={score.band} />
      <SignalList signals={score.signals} />
    </Card>
  );
}`,
    },
    {
      label: "Backend",
      filename: "procurementWorkflow.ts",
      code: `type State = "requested" | "approved" | "ordered" | "received";

export function transition(order: PurchaseOrder, next: State) {
  if (!allowedTransitions[order.state].includes(next)) {
    throw new InvalidTransitionError(order.state, next);
  }
  return { ...order, state: next, history: [...order.history, next] };
}`,
    },
  ],
  card2manage: [
    {
      label: "Frontend",
      filename: "TradeOffer.tsx",
      code: `function TradeOffer({ offer }: { offer: Offer }) {
  const { counter, accept } = useTradeActions(offer.id);

  return (
    <Card>
      <OfferItems items={offer.items} />
      <Button onClick={accept}>Accept</Button>
      <Button variant="ghost" onClick={counter}>Counter</Button>
    </Card>
  );
}`,
    },
    {
      label: "Backend",
      filename: "TradeService.java",
      code: `@Service
public class TradeService {

    public Trade counterOffer(Long tradeId, List<CardStack> items) {
        Trade trade = tradeRepository.findById(tradeId)
            .orElseThrow(TradeNotFoundException::new);

        trade.counter(items);
        return tradeRepository.save(trade);
    }
}`,
    },
  ],
  "ergonomics-desktop": [
    {
      label: "Frontend",
      filename: "AssessmentForm.tsx",
      code: `function AssessmentForm({ onSubmit }: Props) {
  const form = useAssessmentForm();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <PostureFields register={form.register} />
      <RiskFactorFields register={form.register} />
      <Button type="submit">Save assessment</Button>
    </form>
  );
}`,
    },
    {
      label: "Backend",
      filename: "reportEngine.ts",
      code: `export function generateReport(assessment: Assessment, template: Template) {
  const sections = template.sections.map((section) =>
    section.render(assessment)
  );

  return renderPdf({ title: assessment.subject, sections });
}`,
    },
  ],
};
