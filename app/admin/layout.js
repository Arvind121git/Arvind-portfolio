import '../../styles/admin.css';

export const metadata = {
  title: 'Admin Control Center | Portfolio Studio',
  description: 'Manage projects, skills, certificates, and view real-time messages',
};

export default function AdminLayout({ children }) {
  return (
    <div
      style={{
        backgroundColor: '#070913',
        color: '#f8fafc',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      {children}
    </div>
  );
}
