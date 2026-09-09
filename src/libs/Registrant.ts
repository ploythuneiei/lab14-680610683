// รูปร่างของผู้ลงทะเบียน 1 คน — ใช้ร่วมกันหลายไฟล์ (ModalRegister, DashboardPage, UserRegisterCard)
interface Registrant {
  id: number; // ใช้เป็น key ตอน .map()
  fullName: string;
  gender: string; // "male" | "female"
  plan: string; // ชื่อแผนแบบเต็ม เช่น "Mini Marathon 10 Km"
  total: number;
  // 🔧 ต่อยอด (นศ.): เพิ่ม extraItems: string[] เพื่อโชว์ป้ายสินค้าเสริมใน Card
}
export type { Registrant };
