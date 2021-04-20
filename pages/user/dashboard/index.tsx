import { useEffect, useState } from "react";
import Router from "next/router";
import { useUser } from "@lib/hooks";
import useSWR from "swr";

import Layout from "@components/Layout";
import Menu from "@components/dashboard/Menu";
import { NewFormModal } from "@components/dashboard/NewFormModal";
import Link from "next/link";
import { fetcher } from "@lib/fetcher";
import { Loading } from "@components/Loading";

const UserDashboard = () => {
	const user = useUser({ redirectTo: "/login" });
	const { data } = useSWR("/api/user/forms", fetcher);
	const [forms, setForms] = useState([]);

	useEffect(() => {
		if (data) {
			setForms(data?.forms?.data);
		}
	}, [data]);

	const [modal, setModal] = useState(false);

	if (user) {
		if (!user.name) {
			Router.push("/user/dashboard/welcome");
		}
	}

	// loading info while trying to get all forms
	if (!data && user) {
		return <Loading />;
	}

	return (
		<>
			{user && (
				<div>
					<Layout title="Dashboard | QuaKer">
						{/* modals in here */}
						<NewFormModal modal={modal} setModal={setModal} />

						<Menu />
						<hr />

						<div className="w-11/12 mx-auto">
							<div>
								<div className="mt-8">
									<button
										onClick={() => setModal(true)}
										className="bg-teal-500 hover:bg-teal-600 text-white py-3 px-8"
									>
										Create New Form
									</button>
								</div>
							</div>

							<hr className="my-6" />
							{forms && (
								<div className="flex flex-col w-5/6 mx-auto my-8">
									{forms.map((form) => (
										<Link
											key={form.ts}
											href={`/user/forms/${form.ref["@ref"].id}`}
										>
											<a
												className="py-4 border border-teal-500 hover:bg-teal-500 text-teal-900 hover:text-white my-2 px-4 rounded-md flex items-center justify-between"
												title={`View form ${form.data.name}`}
											>
												<p className="text-xl font-bold tracking-wide">
													{form.data.name}
												</p>
												<p className="text-lg">
													{new Date(
														form.data.createdDate
													).toUTCString()}
												</p>
											</a>
										</Link>
									))}
								</div>
							)}
						</div>
					</Layout>
				</div>
			)}
		</>
	);
};

export default UserDashboard;
