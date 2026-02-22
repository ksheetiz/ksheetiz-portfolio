---
slug: zarr-weather-data
title: How I went from 400MB weather files to a few KBs
authors:
  - ksheetiz
tags: [zarr, geospatial, weather, python, data-engineering]
date: 2025-02-22
---

I didn't go looking for Zarr. It found me when I was knee-deep in weather forecast data, trying to figure out how to serve it to users of our application without making the whole thing feel like loading a webpage in 2003.

This is the story of that journey — and why Zarr is one of the more elegant pieces of tech I've encountered in a while.

<!-- truncate -->

## The task

We needed to bring weather forecast data into our platform. Simple enough on the surface. But weather data is not like your typical JSON API response — it's dense, multidimensional, and enormous.

My first lead was **Google WeatherNext**, Google's ML-based weather forecast model. It used BigQuery under the hood, which made querying relatively straightforward. I got familiar with how forecasts are actually generated — which was interesting in itself.

Weather forecast models don't give you a single prediction. They give you **ensemble members** — multiple runs of the same model with slightly different initial conditions. The idea is that the atmosphere is chaotic, and small differences in starting conditions can lead to very different outcomes. So instead of saying "it will rain at 3pm", a good forecast model says "here are 50 possible futures, and most of them have rain at 3pm." That spread gives you a sense of confidence.

Cool stuff. But WeatherNext had some legal constraints for our use case, so I had to look elsewhere.

## Enter NOAA GFS

**NOAA's Global Forecast System (GFS)** is a publicly available, openly licensed weather forecast model. NOAA makes the data available via an AWS S3 bucket — free, public, updated every 6 hours.

The catch? The data comes in **GRIB format**.

GRIB (GRIdded Binary) is a standard format used in meteorology for storing gridded data. It's a binary format, compact, and widely supported in the weather community. It's also completely opaque if you've never dealt with it before.

A single GRIB file covering the entire world for one forecast timestamp? Around **400–500 MB**.

For every forecast run. Every 6 hours. For multiple variables (temperature, wind speed, precipitation, humidity...).

This was going to be a problem.

## The conversion that changed everything

Our application only cares about India. We don't need global coverage — we need a slice.

So the pipeline looked like this:

1. Download the GRIB file from NOAA's S3 bucket
2. Slice it to India's bounding box
3. Convert it to Zarr

Step 3 is where things got interesting.

After slicing and converting, the file size dropped from **~400MB to a few KBs**.

I stared at that number for a while. The entire weather forecast dataset for India — temperature, wind, precipitation across a grid of lat/long points — stored in kilobytes.

## What is Zarr and why does this work?

**Zarr** is a format for storing chunked, compressed, N-dimensional arrays. Think of it like NumPy arrays, but designed from the ground up for cloud storage and partial reads.

A few things make it special:

**Chunking.** Zarr divides your array into chunks. Each chunk is stored and compressed independently. This means you don't need to read the entire dataset to get the value at a single lat/long — you only read the chunk that contains it. For geospatial data this is a game changer.

**Compression.** Each chunk is compressed, typically with Blosc or zstd. Weather data has a lot of spatial correlation — nearby grid points tend to have similar values — which means it compresses extremely well.

**Cloud-native.** Zarr stores are just a directory of files (or objects in S3). There's no single monolithic file to download. You can read a single chunk directly from S3 without downloading anything else.

**N-dimensional.** Weather data is naturally multidimensional — latitude × longitude × time × variable. Zarr handles this natively.

Here's a basic example of what reading Zarr data looks like in Python:
```python
import zarr
import numpy as np

# Open a zarr store (local or from S3)
store = zarr.open('india_weather.zarr', mode='r')

# Access a specific variable
temperature = store['2m_temperature']

# Query a specific lat/long index
print(temperature[lat_idx, lon_idx])
```

No loading the whole file. No parsing binary formats. Just index into the array and get your value.

## Dynamical.org — the shortcut I wish I'd found earlier

Midway through building this pipeline I came across **[dynamical.org](https://dynamical.org)**.

They take NOAA GFS data, convert it to Zarr format, and make it available for free. Which meant the download-and-convert step I'd spent time building was already done for me.

It's one of those moments where you feel slightly annoyed and mostly relieved at the same time.

If you're building anything with NOAA weather data, start there. It'll save you a lot of time.

## Why this matters beyond weather data

The GRIB → Zarr story is really a story about the right data format for the right use case.

GRIB is designed for interchange — moving data between meteorological systems. Zarr is designed for access — reading specific slices of large arrays efficiently.

Most data pipelines have this problem somewhere. A format that's great for storage or transmission is often terrible for querying, and vice versa. Knowing when to convert, and what to convert to, is a genuinely useful skill.

For anything multidimensional and geospatial, Zarr is worth knowing about. The format is elegant, the ecosystem (Xarray, Dask, intake) is solid, and the performance characteristics for cloud access are hard to beat.

I went into this task trying to solve a practical pipeline problem. I came out with a new appreciation for how much thought has gone into solving the problem of storing and accessing large scientific datasets. That's the kind of thing that keeps engineering interesting.