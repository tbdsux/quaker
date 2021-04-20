import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Error from "next/error";
import Layout from "@components/Layout";
import useSWR from "swr";
import Menu from "@components/dashboard/Menu";
import { useUser } from "@lib/hooks";
import { getForm } from "@utils/form";
import { fetcher } from "@lib/fetcher";
import { answerFormData, formData } from "@utils/form-data";
import Modal from "@components/Modal";
import RenderForm from "@components/RenderForm";

interface formStat {
	form: formData;
	formOk: boolean;
}
interface resp {
	ref: object;
	data: answerFormData;
}

const FormReponses = () => {
	const user = useUser({ redirectTo: "/login" });

	const [view, setView] = useState<boolean>(false);
	const [viewResponse, setViewResponse] = useState<answerFormData>(null);

	const [delRefID, setDelRefID] = useState<string>(null);
	const [deleted, setDeleted] = useState<boolean>(false);

	// get {formid} from router
	const router = useRouter();
	const { formid } = router.query;
	const [responses, setResponses] = useState<object[]>(null);

	// main functions
	const handleViewResponse = (resp: answerFormData) => {
		setView(true);
		setViewResponse(resp);
	};

	const handleRemoveResponse = async (resp: resp) => {
		var tf = responses;
		tf.splice(tf.indexOf(resp), 1);

		setDelRefID(resp.ref["@ref"].id);
		setResponses(tf);
		setDeleted(true);
	};

	useEffect(() => {
		if (deleted) {
			fetch("/api/user/forms/get/responses/remove", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					formid: formid,
					respID: delRefID,
				}),
			})
				.then((r) => r.json())
				.then((res) => {
					if (res.deleted) {
						setDeleted(false);
						setDelRefID(null);
					} else {
						// item was not deleted
					}
				});
		}
	}, [deleted, delRefID, formid]);

	// get form info
	const { form, formOk }: formStat = getForm(
		Array.isArray(formid) ? formid.join() : formid
	);

	// get form responses
	const { data } = useSWR(
		formid ? `/api/user/forms/get/responses/${formid}` : null,
		fetcher
	);

	useEffect(() => {
		if (data) {
			setResponses(data.form_responses?.data);
		}
	}, [data]);

	// formid is not valid
	if (!formOk && form) {
		return <>{formid ? <Error statusCode={404} /> : null}</>;
	}

	return (
		<>
			{user && form && (
				<Layout title="Form Responses">
					<Modal
						open={view}
						modal={setView}
						modalClass="w-5/6 mx-auto"
					>
						{view && viewResponse && (
							<div>
								<div className="flex justify-between m-4">
									<h3 className="text-xl font-bold tracking-wide">
										View Response | {viewResponse.formid}
									</h3>
									<p>{viewResponse.responseID}</p>
								</div>
								<hr />
								<div className="w-2/3 p-6 my-2 bg-gray-100 mx-auto">
									<RenderForm
										formfields={form.fields}
										formresp={viewResponse.answers}
									/>
								</div>
							</div>
						)}
					</Modal>
					<Menu />

					<div className="w-5/6 mx-auto my-8">
						<h3 className="text-2xl">
							<Link href={`/user/forms/${formid}`}>
								<a className="font-extrabold text-teal-500 hover:underline">
									{form.name}
								</a>
							</Link>{" "}
							| <span className="text-xl">Responses</span>
						</h3>
						<hr className="my-6" />

						{responses && (
							<div className="py-4 px-8">
								{responses.length > 0 ? (
									<ul>
										{responses.map((resp: resp) => (
											<li
												key={responses.indexOf(resp)}
												className="p-4 border rounded-md my-2"
											>
												<div className="w-full flex items-center justify-between">
													<button
														onClick={() =>
															handleViewResponse(
																resp.data
															)
														}
													>
														{resp.data.responseID}
													</button>
													<div className="flex items-center">
														<p>
															{new Date(
																resp.data.date
															).toUTCString()}
														</p>
														<button
															onClick={() =>
																handleRemoveResponse(
																	resp
																)
															}
															className="ml-2 border p-1 text-sm font-light"
														>
															delete
														</button>
													</div>
												</div>
											</li>
										))}
									</ul>
								) : (
									<p>No responses yet...</p>
								)}
							</div>
						)}
					</div>
				</Layout>
			)}
		</>
	);
};

export default FormReponses;
