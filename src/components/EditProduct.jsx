import { useFormikContext } from "formik";
import React, { useEffect } from "react";

export default function EditProduct({
  product,
  categories,
  setLastPrice,
  setPrice,
}) {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    if (product?.curencycurency2) {
      let val = product?.curencycurency2;
      console.log(val);
      setPrice(val);
      //   setValues({
      //     ...values,
      //     curencycurency2: val,
      //   });
      console.log(values);
      setFieldValue("curencycurency2", val);

      let cur3 = Math.round(+val * values.currency, 2);
      let com = values.commission;
      if (values.category == 7) {
        let comPersent = categories[6].commission;
        console.log(Math.round(cur3 * (comPersent / 100)));

        setFieldValue("commission", Math.round(cur3 * (comPersent / 100)));
        com = Math.round(cur3 * (comPersent / 100));
      }

      setFieldValue("currency3", cur3);
      let fullprice = cur3 + values.chinadelivery + values.chinadelivery2 + com;

      console.log(com);
      setLastPrice(fullprice);
      setFieldValue("fullprice", fullprice);
    }
  }, [
    product,
    categories,
    values.currency,
    values.chinadelivery,
    values.chinadelivery2,
    values.category,
    values.commission,
    setFieldValue,
  ]);

  return <></>;
}
