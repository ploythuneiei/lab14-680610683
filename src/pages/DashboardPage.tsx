import { useEffect, useState } from "react";
import UserRegisterCard from "../components/UserRegisterCard";
import type { Registrant } from "../libs/Registrant";
import { loadRegistrants } from "../libs/Storage";

export default function DashboardPage() {
  const [registrants, setRegistrants] = useState<Registrant[]>([]);

  useEffect(() => {
    setRegistrants(loadRegistrants());
  }, [])

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      {/* Conditional Rendering + Render Component */}
      <div className="mt-3">
        {registrants.length === 0 ? (
          <p className="text-muted">ยังไม่มีผู้ลงทะเบียน</p>
        ) : (
          <>
            <label className="form-label">
              ผู้ลงทะเบียนแล้ว ({registrants.length} คน)
            </label>
            <div className="d-flex flex-column gap-2">
              {registrants.map((r) => (
                <UserRegisterCard key={r.id} registrant={r} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
