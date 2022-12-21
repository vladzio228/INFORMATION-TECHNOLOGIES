import { Base } from '@services/Base';
import { Router } from 'express';
import { IBase } from '@interfaces/IBase';
import { links, LinkType } from '@/shared/shared';
import { BaseValue } from '@interfaces/ICell';

export const baseRouter = Router();

const base = new Base('database');

baseRouter.post('/database/create', (req, res) => {
  const body: IBase = req.body;
  base.create(body.name);

  console.log(base.stringify());

  res.json({
    status: 'success',
    links: links[req.path as LinkType].map(link => link + body.name),
  });
});

baseRouter.delete('/database/delete', (req, res) => {
  const body = req.body;
  const { name } = req?.query;

  if (!name) {
    res.json({
      status: 'failed',
      message: 'Pass the name',
    });
    return;
  }

  base.delete(name as string);
  res.json({
    status: 'success',
    links: links[req.path as LinkType].map(link => link + body.name),
  });
});

baseRouter.post('/table/write', (req, res) => {
  const body: IBase & { data: Record<string, BaseValue> } = req.body;

  base.activate(body.name);
  base.table?.write(body.data);

  console.log(base.stringify());

  res.json({
    status: 'success',
    links: links[req.path as LinkType].map(link => link + body.name),
  });
});

baseRouter.post('/table/update', (req, res) => {
  const body: IBase & { query: Record<string, BaseValue>; data: Record<string, BaseValue> } = req.body;

  base.activate(body.name);
  base.table?.update(body.query, body.data);

  console.log(base.stringify());

  res.json({ status: 'success' });
});

baseRouter.delete('/table/delete', (req, res) => {
  const body: IBase & { query: Record<string, BaseValue> } = req.body;

  base.activate(body.name);
  base.table?.delete(body.query);

  console.log(base.stringify());

  res.json({
    status: 'success',
    links: links[req.path as LinkType].map(link => link + body.name),
  });
});

baseRouter.get('/table/find', (req, res) => {
  const body: IBase & { query: Record<string, BaseValue> } = req.body;

  base.activate(body.name);
  const finded = base.table?.find(body.query);

  console.log(base.stringify());
  res.json({
    status: 'success',
    data: finded,
    links: links[req.path as LinkType].map(link => link + body.name),
  });
});
