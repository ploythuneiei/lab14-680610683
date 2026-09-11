import { useState } from "react";
import type { Registrant } from "../libs/Registrant";

type RegisterForm = {
  fname: string;
  lname: string;
  plan: string;
  gender: string;
  items: Item[];
};

export type Item = {
  id: string;
  label: string;
  price: number;
};

//---- แผนการวิ่ง ----
const plans = [
  { id: "funrun", label: "Fun run 5.5 Km", price: 500 },
  { id: "mini", label: "Mini Marathon 10 Km", price: 800 },
  { id: "half", label: "Half Marathon 21 Km", price: 1200 },
  { id: "full", label: "Full Marathon 42.195 Km", price: 1500 },
];
// ---- สินค้าเสริม ----
const extraItems: Item[] = [
  { id: "bottle", label: "Bottle 🍼", price: 200 },
  { id: "shoes", label: "Shoes 👟", price: 600 },
  { id: "cap", label: "Cap 🧢", price: 400 },
];

export default function ModalRegister({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<RegisterForm>({
    fname: "",
    lname: "",
    plan: "",
    gender: "",
    items: [],
  });

  const updateForm = (key: keyof RegisterForm, value: string | Item) => {
    if (key === "items") {
      const selectedItem = value as Item;
      setForm((prev) => ({
        ...prev,
        [key]: prev.items.some((i) => i.id === selectedItem.id)
          ? prev.items.filter((i) => i !== selectedItem)
          : [...prev.items, selectedItem]
      }))
    }
    else {
      setForm((prev) => ({ ...prev, [key]: value }))
      setErrors((prev) => ({ ...prev, [key]: false }))
    }
  };

  const hasDiscount: boolean = form.items.length === extraItems.length;

  const computeTotalPayment = () => {
    let total = 0;
    const selectedPlan = plans.find((p) => p.id === form.plan);
    if (selectedPlan) total += selectedPlan.price;
    for (let i = 0; i < form.items.length; i++) {
      total += form.items[i].price;
    }

    if (form.items.length === extraItems.length) {
      total = total * 0.8;
    }
    return total;
  };

  const [agree, setAgree] = useState(false);

  const [errors, setErrors] = useState({
    fname: false,
    lname: false,
    plan: false,
    gender: false,
    items: false,
  });


  const STORAGE_KEY = "lab14.registrant";

  const registerBtnOnClick = () => {
    const newErrors = {
      fname: form.fname === "",
      lname: form.lname === "",
      plan: form.plan === "",
      gender: form.gender === "",
      items: false,
    }
    setErrors(newErrors)

    const hasError = Object.values(newErrors).some((isError) => isError);
    if (hasError) return;

    const total = computeTotalPayment();
    const selectedPlan = plans.find((p) => p.id === form.plan);


    const newRegistrant: Registrant = {
      id: Date.now(),
      fullName: `${form.fname} ${form.lname}`,
      gender: form.gender,
      plan: selectedPlan ? selectedPlan.label : "",
      total: total,
      items: form.items,
    }

    const raw = localStorage.getItem(STORAGE_KEY);
    const existing = raw
      ? JSON.parse(raw)
      : [];

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, newRegistrant]));
    alert(`Registration complete.Please pay money for ${total.toLocaleString()} THB.`);
    onClose();
  };

  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1} role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Register CMU Marathon 🏃‍♂️</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <div className="d-flex gap-2">
                <div>
                  <label className="form-label">First name</label>
                  <input
                    className={`form-control ${errors.fname ? "is-invalid" : ""}`}
                    value={form.fname}
                    onChange={(e) => updateForm("fname", e.target.value)}
                  />

                  <div className="invalid-feedback">Invalid first name</div>
                </div>
                <div>
                  <label className="form-label">Last name</label>
                  <input
                    className={`form-control ${errors.lname ? "is-invalid" : ""}`}
                    value={form.lname}
                    onChange={(e) => updateForm("lname", e.target.value)}
                  />

                  <div className="invalid-feedback">Invalid last name</div>
                </div>
              </div>
              <div className="mt-2">
                <label className="form-label">Plan</label>
                <select
                  className={"form-select" + (errors.plan ? " is-invalid" : "")}
                  value={form.plan}
                  onChange={(e) => updateForm("plan", e.target.value)}
                >
                  <option value="">Please select..</option>
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label} ({p.price.toLocaleString()} THB)
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">Please select a Plan</div>
              </div>
              <div className="mt-2">
                <label className="form-label">Gender</label>
                <div>
                  <input
                    className="me-2 form-check-input"
                    type="radio"
                    checked={form.gender === "male"}
                    onChange={() => updateForm("gender", "male")}
                  />
                  Male 👨
                  <input
                    className="mx-2 form-check-input"
                    type="radio"
                    checked={form.gender === "female"}
                    onChange={() => updateForm("gender", "female")}
                  />
                  Female 👩
                </div>
                {
                  errors.gender &&
                  <div className="text-danger">Please select gender</div>
                }
              </div>
              {/* Extra Items */}
              <div>
                <label className="form-label">Extra Item(s)</label>
                {extraItems.map((item) => (
                  <div key={item.id}>
                    <input
                      className="me-2 form-check-input"
                      type="checkbox"
                      id={item.id}
                      value={item.id}
                      checked={form.items.some((i) => (i.id === item.id))}
                      onChange={() => updateForm("items", item)}
                    />
                    <label
                      htmlFor={item.id}
                      className="form-check-label"
                    >
                      {item.label} ({item.price.toLocaleString()} THB)
                    </label>
                  </div>
                ))}
                {/* <div>
                <input className="me-2 form-check-input" type="checkbox" />
                <label className="form-check-label">Bottle 🍼 (200 THB)</label>
              </div>
              <div>
                <input className="me-2 form-check-input" type="checkbox" />
                <label className="form-check-label">Shoes 👟 (600 THB)</label>
              </div>
              <div>
                <input className="me-2 form-check-input" type="checkbox" />
                <label className="form-check-label">Cap 🧢 (400 THB)</label>
              </div> */}
                {/* conditional เมื่อเลือกสินค้าเสริมทั้งหมด ให้แสดง discount*/}
                <span
                  className={`text-success ${hasDiscount ? "d-block" : "d-none"}`}
                >(20% Discounted)</span>
              </div>

              <div className="alert alert-primary mt-3" role="alert">
                Promotion📢 Buy all items to get 20% Discount
              </div>

              <div >Total Payment : {computeTotalPayment().toLocaleString()} THB</div>
            </div>

            <div className="modal-footer">
              <div>
                <input
                  className="me-2 form-check-input"
                  type="checkbox"
                  onChange={(e) => (setAgree(e.target.checked))}
                />I agree to the terms and conditions
              </div>
              <button
                className="btn btn-success my-2"
                onClick={registerBtnOnClick}
                disabled={!agree}
              >
                Register</button>
            </div>
          </div>
        </div>
      </div >
      <div className="modal-backdrop fade show"></div>
    </>
  );
}
