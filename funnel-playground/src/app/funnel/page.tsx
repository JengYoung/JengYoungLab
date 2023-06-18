"use client";

import useFunnel from "@/hooks/funnel/useFunnel";

import React from "react";

const page = () => {
  const [Funnel] = useFunnel();

  return (
    <section>
      <Funnel step="test1">
        <Funnel.Step name="test1">Hello test1!</Funnel.Step>
        <Funnel.Step name="test2">Hello test2!</Funnel.Step>
        <Funnel.Step name="test3">Hello test3!</Funnel.Step>
      </Funnel>
    </section>
  );
};

export default page;
