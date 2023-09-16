export async function submitData(
  datas: {
    phone: string;
    password: string;
  },
  fetcher: any
): Promise<void> {
  const phone = datas["phone"];
  const password = datas["password"];
  
  document.cookie = "phone=" + phone;
  document.cookie = "password=" + password;

  // KV
  //@ts-ignore
  fetcher.submit(event.currentTarget.form, {
    method: "POST",
    body: JSON.stringify({
      phone,
      password,
    }),
  });
}
