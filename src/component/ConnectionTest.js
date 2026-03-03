import React, { useState } from "react";
import { testConnection } from "../../api";

/**
 * Component kiểm tra kết nối Frontend → Backend.
 * Sử dụng: import và thêm <ConnectionTest /> vào bất kỳ trang nào.
 */
function ConnectionTest() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setLoading(true);
    setResult(null);
    const res = await testConnection();
    setResult(res);
    setLoading(false);
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>🔌 Test Kết Nối Backend</h3>
      <p style={styles.desc}>
        Nhấn nút để gọi <code>/api/health</code> trên{" "}
        <strong>http://localhost:4000</strong>
      </p>

      <button
        onClick={handleTest}
        disabled={loading}
        style={styles.button}
      >
        {loading ? "Đang kiểm tra..." : "Kiểm tra kết nối"}
      </button>

      {result && (
        <div
          style={{
            ...styles.resultBox,
            borderColor: result.success ? "#22c55e" : "#ef4444",
            backgroundColor: result.success ? "#f0fdf4" : "#fef2f2",
          }}
        >
          {result.success ? (
            <>
              <p style={{ color: "#16a34a", fontWeight: 600 }}>
                ✅ Kết nối thành công!
              </p>
              <pre style={styles.pre}>
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </>
          ) : (
            <>
              <p style={{ color: "#dc2626", fontWeight: 600 }}>
                ❌ Kết nối thất bại
              </p>
              <p style={{ color: "#dc2626" }}>{result.error}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "24px",
    maxWidth: "480px",
    margin: "24px auto",
    fontFamily: "sans-serif",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
  },
  title: {
    marginTop: 0,
    fontSize: "18px",
  },
  desc: {
    color: "#6b7280",
    fontSize: "14px",
  },
  button: {
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 20px",
    fontSize: "14px",
    cursor: "pointer",
  },
  resultBox: {
    marginTop: "16px",
    padding: "14px",
    borderRadius: "8px",
    border: "1px solid",
  },
  pre: {
    margin: 0,
    fontSize: "13px",
    background: "none",
  },
};

export default ConnectionTest;
