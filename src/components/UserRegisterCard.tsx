import type { Registrant } from "../libs/Registrant";

interface props {
  registrant: Registrant;
}

export default function UserRegisterCard({ registrant }: props) {

  const genderLabel = registrant.gender === "male" ? "👨 Male" : "👩 Female"

  return (
    <>
      <div className="card p-3">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <div className="fw-semibold">
              {registrant.fullName}
            </div>
            <small className="text-muted">
              {registrant.plan}  · {genderLabel}
            </small>
            <div className="d-flex mt-1 gap-1 flex-wrap">
              {registrant.items.map((i) => (
                <span
                  className="badge text-bg-light border"
                  key={i.id}>
                  {i.label}
                </span>
              ))}
            </div>
          </div>
          <div>
            {registrant.total.toLocaleString()} THB
          </div>
        </div>
      </div>
    </>
  )

}
