import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { Project } from '@/types/types'
import { PaginateModel } from 'mongoose'


const ProjectSchema = new mongoose.Schema({
    key: { type: String, required: true, indexed: true },
  projectID: { type: String, required: true },
  name: { type: String, required: true },

  methodologies: { type: [Object], default: [] }, 
  vintages: { type: [String], default: [] },

  registry: { type: String },
  updatedAt: { type: Number },

  country: { type: String },
  region: { type: String },
  price: { type: String },

  stats: { type: Object }, 
  hasSupply: { type: Boolean },

  sustainableDevelopmentGoals: { type: [String], default: [] },

  description: { type: String },
  block_long_description: { type: String, default: null },
  long_description: { type: String },
  short_description: { type: String },

  location: { type: Object }, 
  url: { type: String },

  images: { type: [Object], default: [] },
  satelliteImage: { type: Object },
  standards: { type: [Object], default: [] },

  isTokenized: { type: Boolean, default: false },
  owner: { type: String, default: '' },
  contractAddress: { type: String, default: '' },
  ipfsCID: { type: String, default: '' },
  metadataVersion: { type: Number, default: 1 }
}, { timestamps: true }
)


ProjectSchema.plugin(mongoosePaginate);

const projectModel = mongoose.model<Project, PaginateModel<Project>>('Project', ProjectSchema);

export default projectModel;

