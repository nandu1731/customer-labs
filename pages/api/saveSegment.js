export default async function handler(req, res) {
  const response = await fetch(
    `https://webhook.site/482b436d-952b-441b-bfdb-e1511310fef8`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    }
  );

  if (response.ok) {
    return res
      .status(200)
      .json({ status: true, message: "Saved Segment successfully" });
  } else {
    return res
      .status(400)
      .json({ status: false, error: "Segment failed to save" });
  }
}
