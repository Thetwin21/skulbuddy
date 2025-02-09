"use client";
import { useEffect, useState } from 'react';

// Define the type for an admin object
interface Admin {
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export default function AdminsPage() {
  // Explicitly type the `admins` state as an array of `Admin` objects
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch('/api/admins');
        if (!response.ok) {
          throw new Error('Failed to fetch admins');
        }
        const data = await response.json();
        setAdmins(data); // Assuming the API returns an array of `Admin` objects
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admins</h1>
      <ul>
        {admins.map((admin) => (
          <li key={admin.clerkId} className="mb-2">
            {admin.firstName} {admin.lastName} - {admin.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

// const AdminPage = () => {
//   return (
//     <div className="p-4 flex gap-4 flex-col md:flex-row">
//       {/* LEFT */}
//       <div className="w-full lg:w-2/3 flex flex-col gap-8">
//         {/* USER CARDS */}
//         <div className="flex gap-4 justify-between flex-wrap">
//           <UserCard type="student" />
//           <UserCard type="lecturer" />
//         </div>
//         {/* MIDDLE CHARTS */}
//         <div className="flex gap-4 flex-col lg:flex-row">
//           {/* COUNT CHART */}
//           <div className="w-full lg:w-1/3 h-[450px]">
//             <CountChart />
//           </div>
       
//         </div>
//         {/* BOTTOM CHART */}
//         <div className="w-full h-[500px]">
//           <FinanceChart />
//         </div>
//       </div>
//       {/* RIGHT */}
//       <div className="w-full lg:w-1/3 flex flex-col gap-8">
//         <EventCalendar />
//       </div>
//     </div>
//   );
// };

// export default AdminPage;
// function withServerSideAuth(arg0: ({ req }: { req: any; }) => Promise<{ redirect: { destination: string; permanent: boolean; }; props?: undefined; } | { props: {}; redirect?: undefined; }>) {
//   throw new Error("Function not implemented.");
// }

