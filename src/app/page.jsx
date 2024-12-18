// import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import Dashboard from "../components/Dashboard/Dashboard";

export const metadata = {
    title: "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
    description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Home() {
    return (
        <DefaultLayout>
            <Dashboard />
            {/* Content goes here */}
        </DefaultLayout>
    );
}
