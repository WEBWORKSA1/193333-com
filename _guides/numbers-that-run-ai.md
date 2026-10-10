---
title: "The Numbers That Run AI: Tokens, Context Windows, Parameters and Costs"
short: "The numbers that run AI"
description: "A plain-English guide to the numbers behind AI products: tokens, context windows, parameters, benchmarks, latency and per-token pricing — and how to read them critically."
lead: "AI is sold with numbers. Here is what they measure — and what they don’t."
category: AI
minutes: 7
date: 2026-09-30
faq:
  - q: "Does a bigger context window always mean better results?"
    a: "No. A larger window lets a model read more text at once, but quality can still vary across long inputs, and every extra token adds cost and latency."
---
## Tokens: the unit of everything

Language models read and write **tokens** — chunks of text that are often whole short words or pieces of longer ones. Pricing, speed and limits are all measured in tokens. As a rough guide for English, one token is about four characters. Numbers are often split into several tokens, which is one reason models have historically been less reliable at exact arithmetic on long digit strings and why many AI products call out to a calculator or code tool for math.

## Context window

The **context window** is how many tokens a model can consider at once — your prompt, any documents, the conversation so far and its own answer. Bigger windows enable long-document analysis, but they are not free: more tokens in means more cost and usually more latency.

## Parameters

**Parameters** are the learned weights inside a model. Parameter count was once the headline number, but it is an incomplete guide to quality: training data, training methods and fine-tuning matter at least as much, and many developers no longer publish parameter counts at all.

## Benchmarks

Benchmarks are standardised tests. They are useful for comparing models on specific skills, but they can saturate (top models all score near the ceiling) or leak into training data. The best benchmark is your own: a small set of real tasks from your product, scored consistently.

## Unit economics

For a business, the numbers that decide viability are simple:

- **Cost per request** = input tokens × input price + output tokens × output price
- **Revenue per request** — subscription share, ad revenue or transaction fee
- **Margin** = the difference, multiplied by volume

Use our [AI token cost calculator](/tools/ai-token-cost-calculator/) with your provider’s current prices to model it. Common levers: shorter prompts, caching repeated context, smaller models for simple steps and limits on output length.

## Reading AI numbers critically

Ask what was measured, on which data, by whom, and against what baseline. A single impressive number without those four answers is marketing, not evidence.
