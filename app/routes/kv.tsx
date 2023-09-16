export async function action({ request }: any) {
  const formData = await request.formData();
  const phone = formData.get("phone");
  const password = formData.get("password");

  //@ts-ignore
  const kv = await Deno.openKv();

  kv.set(["phone: " + phone], ["password: " + password]);

  return new Response("added", {
    status: 200,
    headers: {
      "Content-Type": "application/add",
    },
  });
}
