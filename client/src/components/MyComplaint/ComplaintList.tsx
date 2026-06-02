import ComplaintCard, { Complaint } from "./ComplaintCard"

type Props = {
  complaints: Complaint[]
}

export default function ComplaintList({ complaints }: Props) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {complaints.map((c, i) => (
        <div key={c.id} className={i !== 0 ? "border-t border-slate-100" : ""}>
          <ComplaintCard complaint={c} />
        </div>
      ))}
    </div>
  )
}